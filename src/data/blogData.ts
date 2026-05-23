export interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string; // ISO string
  imageUrl?: string;
  tags?: string[];
  province?: string;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export const BASELINE_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: "SOPFFI lance une grande campagne d'alphabétisation des mères célibataires à Bukavu",
    excerpt: "Cette initiative novatrice permet à 120 femmes indigentes d'apprendre à lire, écrire et compter afin de stimuler l'économie de leurs petits commerces d'épargne locale.",
    author: "Irène Masika (Coordination)",
    publishedAt: "2026-05-15T09:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200",
    tags: ["Éducation", "Autonomisation"],
    province: "Sud-Kivu",
    content: `Face au taux d'analphabétisme élevé parmi les femmes rurales et déplacées internes dans la région de Bukavu, l'ONG SOPFFI (Solidarité pour la Promotion de la Famille et de la Femme Indigente) vient d'inaugurer officiellement sa nouvelle campagne d'alphabétisation fonctionnelle.

Ce programme intensif s'étend sur une durée de six mois et s'adresse principalement à un groupe pilote de 120 femmes, issues de milieux défavorisés, qui luttent au quotidien pour assurer la subsistance de leur ménage à travers des activités de micro-commerce de subsistance.

L'apprentissage ne se limite pas à la maîtrise théorique de la langue française ou du swahili. Nous intégrons un volet d'arithmétique pratique indispensable à la saine gestion de leurs étals de marché ou de leurs coopératives d'épargne et de crédit solidaire (AVEC).

« Quand une femme apprend à lire et à compter, c'est toute la structure de la cellule familiale qui s'enrichit et se stabilise », souligne Irène Masika, coordonnatrice locale du projet. Grâce au partenariat solide noué avec des enseignants locaux chevronnés et la mise à disposition de kits scolaires de base de haute qualité, les candidates affichent déjà d'excellents résultats pour cette première phase de démarrage scolaire communautaire.`
  },
  {
    id: 'blog-2',
    title: "Distribution d'aide alimentaire d'urgence au camp de Kanyaruchinya à Goma",
    excerpt: "Nos équipes d'intervention se sont mobilisées pour distribuer plus de 4 tonnes de porridge nutritionnel enrichi et de kits hygiéniques aux femmes enceintes et enfants de moins de 5 ans.",
    author: "Dr. Jean-Marie Kasongo",
    publishedAt: "2026-05-10T14:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200",
    tags: ["Santé & Nutrition", "Urgence"],
    province: "Nord-Kivu",
    content: `La crise humanitaire aiguë caractérisant la périphérie immédiate de Goma, accentuée par l'afflux incessant de familles de déplacés fuyant les exactions de guerre, exige un engagement quotidien de tous les acteurs de terrain. C'est dans ce cadre alarmant que la SOPFFI s'est déployée cette semaine au sein du camp de Kanyaruchinya.

Sous l'impulsion de notre brigade médicale locale et forts de l'appui d'un donateur privé local, nous avons coordonné avec succès une importante distribution ciblée en direction des ménages les plus vulnérables : les jeunes mères enceintes, les nourrices isolées et les enfants en bas âge menacés de cachexie clinique.

Au cours de cette journée d'entraide, ce sont un peu plus de 4 tonnes de céréales enrichies en vitamines, soja et antioxydants (porridge fortifié) qui ont été réparties de manière ordonnée. Ces intrants nutritionnels permettent de juguler rapidement les carences alimentaires sévères et de renforcer le tonus immunitaire de la petite enfance.

Parallèlement, l'ONG a mis l'accent sur la prévention hygiénique de masse. Les épidémies d'origine hydrique menaçant constamment d'embraser l'enceinte précaire du camp, nos agents de santé publique ont remis à chaque bénéficiaire des jerrycans d'eau de source propres, du savon antibactérien de fabrication congolaise et des trousses d'hygiène intime fondamentales.`
  },
  {
    id: 'blog-3',
    title: "Transition écologique : 10 000 jeunes arbres forestiers implantés à Kalehe",
    excerpt: "Suite aux tragiques inondations, notre antenne agricole a réussi la plantation massive de jeunes herbes robustes et de bananiers pour stabiliser durablement les flancs montagneux.",
    author: "Agronome Pascal Musombwa",
    publishedAt: "2026-04-28T08:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80&w=1200",
    tags: ["Agro-pastoral", "Environnement"],
    province: "Sud-Kivu",
    content: `Il y a quelques mois, de violents coulées de boue et des inondations éclair endommageaient lourdement plusieurs villages ruraux de Kalehe, brisant des vies humaines et emportant sur leur passage de précieuses parcelles fertiles d'agro-pastoral.

Fidèle à sa vocation de préservation à long terme de la cellule familiale d'indigents, SOPFFI a tout de suite identifié que le reboisement biologique représentait la seule défense passive résiliente face au réchauffement climatique et à la dégradation des pentes montagneuses rudes.

Grâce à notre pépinière coopérative décentralisée gérée entièrement par des femmes sinistrées de Kalehe, les équipes ont mis en terre un total record de 10 000 arbustes sélectionnés à croissances rapides, comprenant des essences forestières anti-érosives d'enracinement profond ainsi que des agrumes de valeur nutritive.

Cet effort collectif de reforestation transforme peu à peu la structure géologique des collines avoisinantes de Kalehe, tout en redonnant un espoir économique tangible aux ménages agricoles locaux par le biais d'un rendement agroforestier équitable et sécurisé.`
  },
  {
    id: 'blog-4',
    title: "Sensibilisation citoyenne et protection légale des deujours de veuves à Kindu",
    excerpt: "Un forum d'échange communautaire s'est tenu au barreau de Kindu pour enseigner le code successoral légal de la RDC et contrecarrer les spoliations illicites de biens familiaux.",
    author: "Maître Clarisse Kavira",
    publishedAt: "2026-04-18T11:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200",
    tags: ["Droits Humains", "Plaidoyer"],
    province: "Maniema",
    content: `Dans la province du Maniema, de nombreuses veuves sans protection judiciaire subissent au quotidien le drame silencieux de la spoliation foncière et financière de la part de leur belle-famille élargie lors de la perte tragique de l'époux, par méconnaissance des lois républicaines.

Le département juridique de la SOPFFI à Kindu s'est saisi de cette problématique pour organiser une grande conférence-débat rassemblant plus de 90 femmes leaders d'associations, représentantes coutumières et autorités locales à l'auditorium central du Maniema.

Les avocats-conseils bénévoles de notre réseau ont décrypté article par article les dispositions progressistes du Code congolais de la Famille protégeant de manière formelle le droit d'habitation successorale exclusif du conjoint survivant et la transmission des droits aux enfants orphelins.

Cette session solidaire a abouti à la signature collective d'une charte d'engagement mutuel avec 8 chefs locaux importants s'engageant à œuvrer activement pour le règlement à l'amiable et le respect strict de la filiation directe en cas de deuil familial.`
  }
];
