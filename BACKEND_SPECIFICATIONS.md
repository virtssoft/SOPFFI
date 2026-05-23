# Spécifications Techniques pour l'Équipe Backend (SOPFFI) - Architecture PHP & MySQL

Ce document décrit les schémas de base de données MySQL, la politique de gestion des fichiers (images et logos) sous forme de chemins d'accès locaux, ainsi que le routage API requis pour guider l'équipe de développement de l'application backend en **PHP** (sans framework lourd, via une architecture MVC ou API REST pure avec **PDO**).

---

## 1. Gestion des Éléments Multimédias (Photos & Logos)

Afin de simplifier au maximum la structure sans alourdir la base de données, **aucun service de stockage Cloud ni table supplémentaire n'est requis pour les médias**. 

* **Politique de stockage :** Téléversement binaire direct dans des sous-dossiers spécifiques situés dans le répertoire public du backend (ex : `public/uploads/logos/`, `public/uploads/actions/`, `public/uploads/blog/`).
* **Enregistrement en BD :** Les colonnes d'images dans les tables stockent uniquement le chemin d'accès relatif sous forme de chaîne de caractères (ex : `/uploads/actions/action-01.jpg`).
* **Rendu côté Front-end :** L'application React chargera les images en préfixant les chemins reçus avec l'URL de base de l'API (ex : `https://api.sopffi.org/uploads/actions/action-01.jpg`).

### Cas particuliers d'intégration :
1. **Les logos de SOPFFI (En-tête & Pied de page) :** Gérés directement sous forme de fichiers statiques écrasables dans le dossier `/uploads/branding/logo-header.png` et `/uploads/branding/logo-footer.png`. Pas besoin de table.
2. **Les logos de partenaires (Marquee défilant) :** Vos fichiers de logos sont déposés directement dans le dossier `/uploads/partners/`.
3. **Le carrousel ou la photo d'accueil :** Géré via un fichier statique écrasable `/uploads/home/hero-bg.jpg` ou directement lié aux images phares des dernières actions.

---

## 2. Structure Physique de la Base de Données MySQL (DDL)

La base de données doit être composée de **seulement trois tables** : `users`, `actions` et `blog`.

```sql
-- Configuration de la base de données
CREATE DATABASE IF NOT EXISTS `sopffi_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sopffi_db`;

-- -------------------------------------------------------------
-- 1. Table : users (Administration & Rôles des comptes)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) UNIQUE NOT NULL,           -- Clé essentielle de connexion
  `password_hash` VARCHAR(255) NOT NULL,          -- Hachage obligatoire via password_hash() en PHP
  `role` ENUM('SUPER_ADMIN', 'WRITER', 'PROVINCIAL_COORDINATOR') DEFAULT 'WRITER',
  `province_scope` VARCHAR(100) DEFAULT NULL,     -- ex: 'Nord-Kivu' pour limiter l'accès d'un coordinateur
  `is_active` TINYINT(1) DEFAULT 1,               -- 1 pour actif, 0 pour désactivé
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- -------------------------------------------------------------
-- 2. Table : actions (Activités de terrain des provinces)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `actions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,                  -- ex: "Restauration des sols dégradés"
  `province` VARCHAR(100) NOT NULL,               -- ex: "Nord-Kivu", "Sud-Kivu"
  `location` VARCHAR(150) NOT NULL,               -- ex: "Territoire de Kalehe, Goma"
  `domain` VARCHAR(100) NOT NULL,                 -- ex: "Agro-pastoral", "Santé/Droits"
  `tag` VARCHAR(100) DEFAULT NULL,                -- ex: "Insertion", "Reforestation"
  `published_at` DATE NOT NULL,                   -- Date de survenue ou publication
  `image_path` VARCHAR(255) NOT NULL,             -- Chemin d'accès local (ex: "/uploads/actions/restauration.jpg")
  `excerpt` VARCHAR(255) NOT NULL,                -- Court extrait ou résumé pour les affichages en carte
  `content` TEXT NOT NULL,                        -- Descriptif exhaustif rédigé en Markdown ou texte enrichi
  `beneficiaries` VARCHAR(150) DEFAULT NULL,      -- Indicateur (ex: "180 mères célibataires")
  `status` ENUM('Réalisé', 'En cours') DEFAULT 'Réalisé',
  `key_achievements` JSON DEFAULT NULL,           -- Tableau d'impact (ex: JSON : ["10k arbres plantés", "95m formés"])
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- -------------------------------------------------------------
-- 3. Table : blog (Articles d'actualités SOPFFI)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blog` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(150) UNIQUE NOT NULL,            -- URL textuelle pour le SEO (ex: "sensibilisation-droits-femme")
  `title` VARCHAR(255) NOT NULL,                  -- Titre de l'article
  `excerpt` TEXT NOT NULL,                        -- Résumé accrocheur
  `content` MEDIUMTEXT NOT NULL,                  -- Corps complet au format Markdown
  `author` VARCHAR(150) NOT NULL,                 -- ex: "Jean-Marc (Rédacteur)"
  `published_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_path` VARCHAR(255) DEFAULT NULL,          -- Chemin (ex: "/uploads/blog/sensibilisation.jpg")
  `tags` JSON DEFAULT NULL,                       -- Tableau JSON pour filtrage (ex: ["Genre", "Éducation"])
  `province` VARCHAR(100) DEFAULT NULL,           -- Spécification éventuelle de province
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Indexation et optimisation du routage SEO
CREATE INDEX `idx_blog_slug` ON `blog` (`slug`);
```

---

## 3. Gestion de la Sécurité & Authentification en PHP Pur

L'intégration doit impérativement utiliser les protocoles standards de hachage de mot de passe natifs de PHP pour éviter toute fuite de données d'accès :

### 3.1 Hachage Sécurisé (À l'enregistrement/création d'un User)
Ne jamais stocker le mot de passe en clair.
```php
$plainPassword = $_POST['password']; // ex: '0987654321'
$passwordHash = password_hash($plainPassword, PASSWORD_BCRYPT, ['cost' => 12]);

// Insertion sécurisée via PDO préparé
$stmt = $pdo->prepare("INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)");
$stmt->execute([$fullName, $email, $passwordHash, $role]);
```

### 3.2 Authentification Sécurisée (Login)
```php
$email = $_POST['email'];
$password = $_POST['password'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND is_active = 1 LIMIT 1");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password_hash'])) {
    // Authentification acceptée !
    // Générer un jeton JWT ou créer une session_start() PHP
} else {
    // Identifiants erronés ou compte suspendu
    http_response_code(401);
    echo json_encode(["error" => "Identifiants ou privilèges non valides."]);
}
```

---

## 4. Points d'Accès d'API REST (Routing REST en PHP)

Toutes les réponses de l'API destinées au React doivent renvoyer du JSON et autoriser les requêtes transverses (CORS) si l'application finale est déployée sur un serveur distinct :

```php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
```

### 4.1 Authentification (`/api/auth`)
* `POST /api/auth/login` : Vérifie l'adresse e-mail et le mot de passe. Donne accès au token d'accès admin.

### 4.2 Module d'Actions de Terrain (`/api/actions`)
* `GET /api/actions` : Retourne la liste publique des réalisations.
* `GET /api/actions/{id}` : Retourne les détails d'une réalisation.
* `POST /api/actions` *(Sécurisé par JWT)* : Crée une nouvelle réalisation, téléverse la photo jointe et enregistre son chemin d'accès relatif (ex: `/uploads/actions/mon-image.png`).
* `PUT /api/actions/{id}` *(Sécurisé par JWT)* : Modifie la réalisation et met éventuellement à jour la photo stockée.
* `DELETE /api/actions/{id}` *(Sécurisé par JWT)* : Supprime la réalisation de la BD et nettoie le fichier physique via PHP `unlink()`.

### 4.3 Module d'Actualités du Blog (`/api/blog`)
* `GET /api/blog` : Retourne la collection des actualités.
* `GET /api/blog/{slug}` : Résout un article spécifique à l'aide de sa clé d'accès URL textuelle (`slug`).
* `POST /api/blog` *(Sécurisé par JWT)* : Crée l'article, calcule le slug d'URL (en supprimant accents et caractères spéciaux de son titre), transfère l'image vedette de l'article vers le répertoire dédié.
* `PUT /api/blog/{id}` *(Sécurisé par JWT)* : Édite le contenu ou l'image de couverture.
* `DELETE /api/blog/{id}` *(Sécurisé par JWT)* : Supprime l'article et supprime le fichier d'image associé sur le serveur.

### 4.4 Module de Comptes Utiles (`/api/users`)
* `GET /api/users` *(SUPER_ADMIN requis)* : Liste tous les administrateurs inscrits.
* `POST /api/users` *(SUPER_ADMIN requis)* : Ajout d'accès opérationnel (coordinateur provincial, secrétaire, etc.).
* `PUT /api/users/{id}` *(Sécurisé)* : Modifie ou réinitialise les mots de passe.
* `DELETE /api/users/{id}` *(SUPER_ADMIN requis)* : Révoque / supprime le profil.
