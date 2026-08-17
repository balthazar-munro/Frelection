import type { Source, Topic } from '../../lib/schema';

/**
 * DRAFT — NOT YET VERIFIED.
 *
 * Every position below was drafted from the sources cited on it, but no quote
 * has been checked verbatim against its URL yet (`verified: false` throughout).
 * Until a human review pass flips those flags, the dataset status stays
 * `draft_unverified` and the site shows a banner saying so.
 *
 * Known limitation, stated plainly: full 2027 platform documents mostly do not
 * exist yet. Positions here are drawn from the 2024 législatives programmes,
 * bills actually tabled in Parliament, recorded votes on the 26 January 2024
 * immigration law, and on-record statements. Where a party's 2027 position is
 * genuinely not established, the stance is `no_stated_position` rather than an
 * extrapolation.
 */

const S = {
  rn22: {
    url: 'https://rassemblementnational.fr/22-mesures',
    title: 'Les 22 mesures',
    publisher: 'Rassemblement national',
    type: 'programme',
    date: '2024-06-01',
    quote:
      "Supprimer le droit du sol et réserver l'accès à la nationalité française à la naturalisation, sur critères de mérite et d'assimilation.",
    verified: false,
  } satisfies Source,
  rnSurligneurs: {
    url: 'https://lessurligneurs.eu/immigration-les-promesses-et-les-non-dits-du-programme-du-rassemblement-national/',
    title: 'Immigration : les promesses et les non-dits du programme du Rassemblement national',
    publisher: 'Les Surligneurs',
    type: 'press',
    date: '2024-06-20',
    quote:
      "Le programme du RN prévoit la fin du regroupement familial, la suppression de l'AME et la priorité nationale pour le logement social et l'emploi.",
    verified: false,
  } satisfies Source,
  rnReferendum: {
    url: 'https://lcp.fr/actualites/legislatives-2024-le-programme-du-rassemblement-national-en-matiere-d-immigration-a-l',
    title:
      "Législatives 2024 : le programme du Rassemblement national en matière d'immigration à l'épreuve de la Constitution",
    publisher: 'LCP — Assemblée nationale',
    type: 'press',
    date: '2024-06-25',
    quote:
      "Le RN entend passer par un référendum sur l'immigration afin de contourner les obstacles constitutionnels à la priorité nationale.",
    verified: false,
  } satisfies Source,
  lrConstit: {
    url: 'https://www.publicsenat.fr/actualites/politique/info-public-senat-immigration-que-contient-la-proposition-de-loi-constitutionnelle-des-lr',
    title: "Immigration : que contient la proposition de loi constitutionnelle des LR ?",
    publisher: 'Public Sénat',
    type: 'law',
    date: '2023-05-25',
    quote:
      "Le texte donne au Parlement le pouvoir de fixer chaque année par la loi une politique de quotas pour toutes les catégories d'immigration, hors ressortissants européens et demandeurs d'asile.",
    verified: false,
  } satisfies Source,
  lrDeuxPPL: {
    url: 'https://www.publicsenat.fr/actualites/politique/immigration-ce-que-contiennent-les-deux-propositions-de-loi-lr',
    title: 'Immigration : que contiennent les deux propositions de loi LR ?',
    publisher: 'Public Sénat',
    type: 'law',
    date: '2023-05-25',
    quote:
      "La proposition de loi ordinaire restreint le droit du sol et durcit les procédures d'éloignement ; la proposition constitutionnelle inscrit le principe d'assimilation et étend l'article 11 au référendum sur l'immigration.",
    verified: false,
  } satisfies Source,
  loi2024: {
    url: "https://fr.wikipedia.org/wiki/Loi_du_26_janvier_2024_pour_contrôler_l'immigration,_améliorer_l'intégration",
    title: "Loi du 26 janvier 2024 pour contrôler l'immigration, améliorer l'intégration",
    publisher: 'Wikipédia',
    type: 'law',
    date: '2024-01-26',
    quote:
      "La loi modifie l'acquisition automatique de la nationalité française à la majorité pour les personnes nées en France de parents étrangers, en exigeant désormais une manifestation de volonté.",
    verified: false,
  } satisfies Source,
  lcpTourHorizon: {
    url: 'https://lcp.fr/actualites/legislatives-2024-quelles-propositions-en-matiere-d-immigration-tour-d-horizon-des',
    title:
      "Législatives 2024 : quelles propositions en matière d'immigration ? Tour d'horizon des programmes",
    publisher: 'LCP — Assemblée nationale',
    type: 'press',
    date: '2024-06-21',
    quote:
      "Le PS, les Écologistes et les autres partis de gauche veulent abroger les lois immigration de 2018 et 2023, régulariser les travailleurs, les étudiants et les parents d'enfants scolarisés, et faire de la carte de séjour de dix ans le titre de droit commun.",
    verified: false,
  } satisfies Source,
  nfpInfomigrants: {
    url: 'https://www.infomigrants.net/fr/post/58284/immigration--le-nouveau-front-populaire-mise-sur-moins-de-repression-et-plus-daccompagnement-des-etrangers',
    title:
      "Immigration : le Nouveau Front populaire mise sur moins de répression et plus d'accompagnement des étrangers",
    publisher: 'InfoMigrants',
    type: 'press',
    date: '2024-06-24',
    quote:
      "Le programme prévoit la régularisation des travailleurs sans-papiers, l'accueil inconditionnel des mineurs non accompagnés et l'abrogation des dispositions les plus restrictives de la loi de 2024.",
    verified: false,
  } satisfies Source,
  lfiElysee: {
    url: 'https://www.elyseescope.com/candidat/jean-luc-melenchon/immigration',
    title: 'Que propose Jean-Luc Mélenchon sur l\'immigration ?',
    publisher: 'ÉlyséeScope',
    type: 'press',
    date: '2026-06-01',
    quote:
      "Régularisation des sans-papiers, droit de vote des étrangers aux élections locales, accueil inconditionnel des mineurs non accompagnés et abrogation des lois restrictives.",
    verified: false,
  } satisfies Source,
  lfiRegul: {
    url: 'https://lcp.fr/actualites/regularisation-des-travailleurs-sans-papiers-l-amendement-de-compromis-de-la-majorite',
    title:
      "Régularisation des travailleurs sans-papiers : l'amendement de « compromis » de la majorité adopté en commission",
    publisher: 'LCP — Assemblée nationale',
    type: 'vote',
    date: '2023-11-28',
    quote:
      "Les députés LFI ont dénoncé le côté « utilitariste » du dispositif et réaffirmé leur volonté de « régulariser tous les travailleurs sans-papiers présents sur le territoire ».",
    verified: false,
  } satisfies Source,
  metiersTension: {
    url: 'https://www.publicsenat.fr/actualites/parlementaire/immigration-la-gauche-et-des-elus-macronistes-mettent-la-pression-pour-defendre-les-regularisations-dans-les-metiers-en-tension',
    title:
      'Immigration : la gauche et des élus macronistes mettent la pression pour défendre les régularisations dans les métiers en tension',
    publisher: 'Public Sénat',
    type: 'vote',
    date: '2023-12-06',
    quote:
      "Socialistes, écologistes et communistes ont défendu la création d'un titre de séjour pour les travailleurs des métiers en tension et la préservation de l'article 4 ouvrant le marché du travail aux demandeurs d'asile.",
    verified: false,
  } satisfies Source,
  compromisFranceinfo: {
    url: 'https://www.franceinfo.fr/politique/parlement-francais/assemblee-nationale/les-deputes-votent-en-commission-un-compromis-sur-la-regularisation-des-sans-papiers-dans-les-metiers-en-tension_6215445.html',
    title:
      'Les députés votent en commission un compromis sur la régularisation des sans-papiers dans les métiers en tension',
    publisher: 'franceinfo',
    type: 'vote',
    date: '2023-11-28',
    quote:
      "Le compromis de la majorité ouvre une régularisation encadrée, à la main du préfet, pour les travailleurs des métiers en tension, sans créer de droit automatique.",
    verified: false,
  } satisfies Source,
  philippeProgramme: {
    url: 'https://monvote2027.fr/candidat/philippe',
    title: 'Édouard Philippe — Programme et positions',
    publisher: 'MonVote2027',
    type: 'press',
    date: '2026-05-01',
    quote:
      "Édouard Philippe défend une immigration de travail assumée, avec des quotas de régularisation dans les métiers en tension, en rupture avec l'immigration familiale, et une exécution plus systématique des OQTF.",
    verified: false,
  } satisfies Source,
  philippeQuotas: {
    url: 'https://www.aljazeera.com/news/2019/10/france-prime-minister-signals-support-immigration-quotas-191008011749419.html',
    title: "France's prime minister signals support for immigration quotas",
    publisher: 'Al Jazeera',
    type: 'statement',
    date: '2019-10-08',
    quote:
      "Édouard Philippe, alors Premier ministre, s'est déclaré favorable à des quotas d'immigration économique fixés en fonction des besoins du marché du travail.",
    verified: false,
  } satisfies Source,
  zemmourZero: {
    url: 'https://www.europe1.fr/politique/je-suis-pour-limmigration-zero-mais-aussi-pour-limmigration-negative-martele-eric-zemmour-958758',
    title:
      "« Je suis pour l'immigration zéro mais aussi pour l'immigration négative », martèle Éric Zemmour",
    publisher: 'Europe 1',
    type: 'statement',
    date: '2021-09-01',
    quote:
      "« Je suis pour l'immigration zéro mais aussi pour l'immigration négative. »",
    verified: false,
  } satisfies Source,
  zemmourRemigration: {
    url: 'https://www.lejdd.fr/Politique/le-debrief-presidentiel-zemmour-veut-un-ministere-de-la-remigration-roussel-sen-prend-aux-ecologistes-4101081',
    title: "Zemmour veut un « ministère de la remigration »",
    publisher: 'Le JDD',
    type: 'statement',
    date: '2022-03-01',
    quote:
      "Éric Zemmour propose la création d'un ministère de la « remigration » chargé d'expulser les étrangers condamnés, les fichés S et les extra-Européens au chômage depuis plus de six mois.",
    verified: false,
  } satisfies Source,
  france24Legis: {
    url: 'https://www.france24.com/fr/france/20240619-l%C3%A9gislatives-2024-ce-que-proposent-les-partis-sur-l-immigration-et-la-la%C3%AFcit%C3%A9',
    title: "Législatives 2024 : ce que proposent les partis sur l'immigration et la laïcité",
    publisher: 'France 24',
    type: 'press',
    date: '2024-06-19',
    quote:
      "Le camp présidentiel défend la ligne de la loi de janvier 2024 : durcissement des conditions d'accès aux prestations, exécution renforcée des OQTF, maintien d'une immigration de travail encadrée.",
    verified: false,
  } satisfies Source,
  senatConstit: {
    url: 'https://www.senat.fr/travaux-parlementaires/textes-legislatifs/la-loi-en-clair/proposition-de-loi-constitutionnelle-relative-a-la-souverainete-de-la-france-a-la-nationalite-a-limmigration-et-a-lasile.html',
    title:
      "Proposition de loi constitutionnelle relative à la souveraineté de la France, à la nationalité, à l'immigration et à l'asile",
    publisher: 'Sénat',
    type: 'law',
    date: '2023-05-25',
    quote:
      "Le texte réforme les conditions d'accès à la nationalité française et à l'asile, et permet aux Français de se prononcer par référendum sur la politique migratoire.",
    verified: false,
  } satisfies Source,
};

export const immigration: Topic = {
  id: 'immigration',
  title: { fr: 'Immigration et nationalité', en: 'Immigration and nationality' },
  intro: {
    fr: "L'immigration est le sujet où les programmes de 2027 divergent le plus, et où les propositions se heurtent le plus souvent à la Constitution et aux engagements européens de la France. Les six questions ci-dessous portent sur des dispositifs juridiques précis — droit du sol, régularisation, AME, regroupement familial, conditions d'accès aux prestations, voie constitutionnelle — et non sur un « plus » ou un « moins » d'immigration en général.",
    en: 'Immigration is where the 2027 platforms diverge most sharply, and where proposals most often run into the Constitution and France\'s European commitments. The six questions below concern specific legal mechanisms — birthright citizenship, regularisation, state medical aid, family reunification, benefit eligibility, and the constitutional route — rather than "more" or "less" immigration in the abstract.',
  },
  questions: [
    {
      id: 'droit-du-sol',
      prompt: {
        fr: "Comment la nationalité française devrait-elle s'acquérir pour une personne née en France de parents étrangers ?",
        en: 'How should French nationality be acquired by someone born in France to foreign parents?',
      },
      context: {
        fr: "Aujourd'hui, un enfant né en France de parents étrangers devient français à 18 ans s'il y réside depuis au moins cinq ans depuis l'âge de 11 ans. La loi du 26 janvier 2024 a durci ce mécanisme en exigeant une manifestation de volonté explicite entre 16 et 18 ans.",
        en: 'Today, a child born in France to foreign parents becomes French at 18 if they have lived there at least five years since the age of 11. The law of 26 January 2024 tightened this by requiring an explicit application between 16 and 18.',
      },
      options: [
        {
          id: 'abolir',
          label: { fr: 'Supprimer le droit du sol', en: 'Abolish birthright citizenship' },
          detail: {
            fr: "Supprimer entièrement l'acquisition de la nationalité par la naissance sur le sol français. La nationalité ne s'obtiendrait plus que par filiation ou par naturalisation, sur critères de mérite et d'assimilation.",
            en: 'Abolish acquisition of nationality by birth on French soil entirely. Nationality would be obtained only by descent or by naturalisation, on merit and assimilation criteria.',
          },
        },
        {
          id: 'restreindre',
          label: { fr: 'Restreindre fortement', en: 'Substantially restrict' },
          detail: {
            fr: "Conserver le droit du sol mais en durcir les conditions : demande explicite, durée de résidence allongée, condition de régularité du séjour des parents, et exclusion en cas de condamnation pénale.",
            en: 'Keep birthright citizenship but tighten the conditions: explicit application, longer residence requirement, lawful residence of the parents, and exclusion in case of a criminal conviction.',
          },
        },
        {
          id: 'statu-quo',
          label: { fr: 'Maintenir le cadre actuel', en: 'Keep the current framework' },
          detail: {
            fr: "Conserver le droit du sol tel qu'issu de la loi de janvier 2024, avec la manifestation de volonté entre 16 et 18 ans, sans nouvelle restriction ni assouplissement.",
            en: 'Keep birthright citizenship as amended by the January 2024 law, including the application requirement between 16 and 18, with no further restriction or easing.',
          },
        },
        {
          id: 'faciliter',
          label: { fr: "Revenir sur les restrictions", en: 'Roll back the restrictions' },
          detail: {
            fr: "Abroger les durcissements de 2024 et rétablir l'acquisition automatique à la majorité, en simplifiant par ailleurs les procédures de naturalisation.",
            en: 'Repeal the 2024 tightening and restore automatic acquisition at 18, while also simplifying naturalisation procedures.',
          },
        },
      ],
      positions: [
        {
          partyId: 'rn',
          stance: 'maps_to_option',
          optionId: 'abolir',
          partialMatch: [],
          summary: {
            fr: "Le RN propose la suppression pure et simple du droit du sol. L'accès à la nationalité serait réservé à la naturalisation, accordée sur des critères de mérite et d'assimilation. La mesure figure parmi les propositions nécessitant une révision constitutionnelle ou un référendum.",
            en: 'The RN proposes outright abolition of birthright citizenship. Access to nationality would be reserved for naturalisation, granted on merit and assimilation criteria. The measure is among those requiring a constitutional revision or a referendum.',
          },
          sources: [S.rn22, S.rnReferendum],
          confidence: 'high',
        },
        {
          partyId: 'reconquete',
          stance: 'maps_to_option',
          optionId: 'abolir',
          partialMatch: [],
          summary: {
            fr: "Reconquête défend la suppression du droit du sol dans le cadre plus large d'une politique d'« immigration zéro » puis « négative ». La nationalité relèverait exclusivement de la filiation et d'une naturalisation très restrictive.",
            en: 'Reconquête supports abolishing birthright citizenship as part of a broader policy of "zero" and then "negative" immigration. Nationality would derive exclusively from descent and a highly restrictive naturalisation route.',
          },
          sources: [S.zemmourZero, S.zemmourRemigration],
          confidence: 'medium',
        },
        {
          partyId: 'lr',
          stance: 'maps_to_option',
          optionId: 'restreindre',
          partialMatch: [],
          summary: {
            fr: "LR a déposé une proposition de loi restreignant le droit du sol sans le supprimer, assortie d'une proposition constitutionnelle réformant les conditions d'accès à la nationalité. L'acquisition deviendrait conditionnée à une démarche volontaire et à des critères d'assimilation inscrits dans la Constitution.",
            en: 'LR tabled a bill restricting rather than abolishing birthright citizenship, alongside a constitutional bill reforming access to nationality. Acquisition would be conditioned on a voluntary application and on assimilation criteria written into the Constitution.',
          },
          sources: [S.lrDeuxPPL, S.senatConstit],
          confidence: 'high',
        },
        {
          partyId: 'renaissance',
          stance: 'maps_to_option',
          optionId: 'statu-quo',
          partialMatch: [],
          summary: {
            fr: "Renaissance défend le cadre issu de la loi du 26 janvier 2024, qu'elle a portée : maintien du droit du sol assorti de la manifestation de volonté entre 16 et 18 ans. Le parti n'a pas proposé de nouveau durcissement depuis.",
            en: 'Renaissance defends the framework set by the 26 January 2024 law, which it sponsored: birthright citizenship retained, subject to an application between 16 and 18. The party has not proposed further tightening since.',
          },
          sources: [S.loi2024, S.france24Legis],
          confidence: 'medium',
        },
        {
          partyId: 'horizons',
          stance: 'no_stated_position',
          optionId: null,
          partialMatch: [],
          summary: {
            fr: "Édouard Philippe s'est exprimé en détail sur l'immigration de travail et l'exécution des OQTF, mais n'a pas formulé de position propre sur le droit du sol pour 2027. Aucune proposition distincte de celle du camp présidentiel n'est documentée à ce stade.",
            en: 'Édouard Philippe has spoken in detail about labour migration and enforcement of removal orders, but has set out no distinct position on birthright citizenship for 2027. No proposal separate from the presidential camp is documented at this stage.',
          },
          sources: [],
          confidence: 'low',
        },
        {
          partyId: 'ps',
          stance: 'maps_to_option',
          optionId: 'faciliter',
          partialMatch: ['statu-quo'],
          summary: {
            fr: "Le PS demande l'abrogation des dispositions restrictives des lois de 2018 et 2024, ce qui inclut le retour à l'acquisition automatique de la nationalité à la majorité. Il défend par ailleurs la carte de séjour de dix ans comme titre de droit commun.",
            en: 'The PS calls for repeal of the restrictive provisions of the 2018 and 2024 laws, which includes restoring automatic acquisition of nationality at 18. It also advocates the ten-year residence permit as the standard permit.',
          },
          sources: [S.lcpTourHorizon],
          confidence: 'medium',
        },
        {
          partyId: 'ecologistes',
          stance: 'maps_to_option',
          optionId: 'faciliter',
          partialMatch: [],
          summary: {
            fr: "Les Écologistes s'associent à la demande d'abrogation des lois immigration de 2018 et 2023-2024 et au rétablissement de l'acquisition automatique de la nationalité. Ils défendent une simplification générale des procédures de naturalisation.",
            en: 'The Ecologists join the call to repeal the 2018 and 2023-2024 immigration laws and to restore automatic acquisition of nationality. They advocate a general simplification of naturalisation procedures.',
          },
          sources: [S.lcpTourHorizon, S.nfpInfomigrants],
          confidence: 'medium',
        },
        {
          partyId: 'lfi',
          stance: 'maps_to_option',
          optionId: 'faciliter',
          partialMatch: [],
          summary: {
            fr: "LFI demande l'abrogation des lois restrictives et le rétablissement du droit du sol dans sa forme automatique. Le parti y ajoute le droit de vote des étrangers aux élections locales, qui suppose une révision constitutionnelle.",
            en: 'LFI calls for repeal of the restrictive laws and restoration of automatic birthright citizenship. It adds voting rights for foreign residents in local elections, which would require a constitutional revision.',
          },
          sources: [S.lfiElysee, S.nfpInfomigrants],
          confidence: 'medium',
        },
      ],
    },
    {
      id: 'regularisation',
      prompt: {
        fr: 'Que faire des personnes sans titre de séjour qui travaillent en France ?',
        en: 'What should happen to people working in France without a residence permit?',
      },
      context: {
        fr: "La loi du 26 janvier 2024 a créé une régularisation encadrée pour les travailleurs des métiers en tension, laissée à l'appréciation du préfet et sans droit automatique. La gauche demandait un droit opposable ; la droite s'opposait à toute régularisation.",
        en: 'The 26 January 2024 law created a restricted regularisation route for workers in shortage occupations, left to prefectural discretion with no automatic right. The left wanted an enforceable right; the right opposed any regularisation.',
      },
      options: [
        {
          id: 'aucune',
          label: { fr: 'Aucune régularisation', en: 'No regularisation' },
          detail: {
            fr: "Exclure toute régularisation et appliquer systématiquement les mesures d'éloignement, y compris pour les personnes en emploi. Sanctionner les employeurs.",
            en: 'Rule out any regularisation and systematically enforce removal, including for people in work. Penalise employers.',
          },
        },
        {
          id: 'discretionnaire',
          label: { fr: 'Cas par cas, à la main du préfet', en: 'Case by case, prefectural discretion' },
          detail: {
            fr: "Pas de droit à la régularisation, mais une possibilité laissée à l'appréciation de l'administration, strictement encadrée et réservée à des situations exceptionnelles.",
            en: 'No right to regularisation, but a possibility left to administrative discretion, tightly framed and reserved for exceptional cases.',
          },
        },
        {
          id: 'metiers-tension',
          label: { fr: 'Régularisation par les métiers en tension', en: 'Regularisation via shortage occupations' },
          detail: {
            fr: "Créer un titre de séjour pour les travailleurs des secteurs en pénurie de main-d'œuvre, indépendant de l'employeur, éventuellement contingenté par des quotas annuels.",
            en: 'Create a residence permit for workers in labour-shortage sectors, independent of the employer, potentially capped by annual quotas.',
          },
        },
        {
          id: 'large',
          label: { fr: 'Régularisation large', en: 'Broad regularisation' },
          detail: {
            fr: "Régulariser l'ensemble des travailleurs sans papiers, ainsi que les parents d'enfants scolarisés et les étudiants, sans condition de secteur d'activité.",
            en: 'Regularise all undocumented workers, along with parents of school-age children and students, with no sectoral condition.',
          },
        },
      ],
      positions: [
        {
          partyId: 'rn',
          stance: 'maps_to_option',
          optionId: 'aucune',
          partialMatch: [],
          summary: {
            fr: "Le RN exclut toute régularisation et prévoit l'expulsion systématique des étrangers en situation irrégulière. Le programme associe cette ligne à la fin de l'immigration de peuplement et au traitement des demandes d'asile hors du territoire français.",
            en: 'The RN rules out any regularisation and provides for systematic expulsion of those in an irregular situation. The platform ties this to ending settlement migration and processing asylum claims outside French territory.',
          },
          sources: [S.rn22, S.rnSurligneurs],
          confidence: 'high',
        },
        {
          partyId: 'reconquete',
          stance: 'maps_to_option',
          optionId: 'aucune',
          partialMatch: [],
          summary: {
            fr: "Reconquête va au-delà du refus de régulariser : le parti propose un ministère de la « remigration » chargé d'organiser les départs, visant notamment les étrangers condamnés, les fichés S et les extra-Européens sans emploi depuis plus de six mois.",
            en: 'Reconquête goes beyond refusing regularisation: it proposes a "remigration" ministry to organise departures, targeting in particular convicted foreign nationals, those on security watchlists, and non-Europeans unemployed for over six months.',
          },
          sources: [S.zemmourRemigration, S.zemmourZero],
          confidence: 'medium',
        },
        {
          partyId: 'lr',
          stance: 'maps_to_option',
          optionId: 'discretionnaire',
          partialMatch: ['aucune'],
          summary: {
            fr: "LR s'est opposé à la création d'un droit à la régularisation par les métiers en tension lors de l'examen de la loi de 2024, tout en acceptant une possibilité discrétionnaire strictement encadrée. Le parti privilégie un pilotage par quotas votés annuellement au Parlement.",
            en: 'LR opposed creating a right to regularisation through shortage occupations during the 2024 law, while accepting a tightly framed discretionary possibility. It favours steering migration through quotas voted annually by Parliament.',
          },
          sources: [S.compromisFranceinfo, S.lrConstit],
          confidence: 'high',
        },
        {
          partyId: 'renaissance',
          stance: 'maps_to_option',
          optionId: 'metiers-tension',
          partialMatch: ['discretionnaire'],
          summary: {
            fr: "Renaissance a porté le compromis de 2024 : une régularisation par les métiers en tension, réelle mais laissée à l'appréciation du préfet et sans droit automatique. Le parti défend le maintien de ce dispositif plutôt que son extension.",
            en: 'Renaissance sponsored the 2024 compromise: a real regularisation route via shortage occupations, but left to prefectural discretion with no automatic right. The party defends keeping this mechanism rather than extending it.',
          },
          sources: [S.compromisFranceinfo, S.france24Legis],
          confidence: 'medium',
          divergenceNote: {
            fr: "Une partie des élus du camp présidentiel a voté avec la gauche pour défendre un dispositif plus large que la ligne officielle du parti.",
            en: 'Some presidential-camp members voted with the left to defend a broader mechanism than the party\'s official line.',
          },
        },
        {
          partyId: 'horizons',
          stance: 'maps_to_option',
          optionId: 'metiers-tension',
          partialMatch: [],
          summary: {
            fr: "Édouard Philippe assume une immigration de travail au motif que la population active se contracte, et propose des quotas de régularisation dans les métiers en tension. Il associe cette ouverture à une restriction de l'immigration familiale.",
            en: 'Édouard Philippe openly supports labour migration on the grounds that the working-age population is shrinking, and proposes regularisation quotas in shortage occupations. He pairs this opening with restrictions on family migration.',
          },
          sources: [S.philippeProgramme, S.philippeQuotas],
          confidence: 'medium',
        },
        {
          partyId: 'ps',
          stance: 'maps_to_option',
          optionId: 'large',
          partialMatch: ['metiers-tension'],
          summary: {
            fr: "Le PS a défendu au Parlement la création d'un titre de séjour pour les métiers en tension, mais son programme va plus loin : régularisation des travailleurs, des étudiants et des parents d'enfants scolarisés, et carte de dix ans comme titre de droit commun.",
            en: 'The PS defended a shortage-occupation permit in Parliament, but its platform goes further: regularisation of workers, students and parents of school-age children, with the ten-year card as the standard permit.',
          },
          sources: [S.metiersTension, S.lcpTourHorizon],
          confidence: 'medium',
        },
        {
          partyId: 'ecologistes',
          stance: 'maps_to_option',
          optionId: 'large',
          partialMatch: ['metiers-tension'],
          summary: {
            fr: "Les Écologistes ont soutenu la régularisation par les métiers en tension au Parlement tout en portant une régularisation plus large dans leur programme, associée à l'accueil inconditionnel des mineurs non accompagnés.",
            en: 'The Ecologists backed shortage-occupation regularisation in Parliament while advocating broader regularisation in their platform, alongside unconditional reception of unaccompanied minors.',
          },
          sources: [S.metiersTension, S.nfpInfomigrants],
          confidence: 'medium',
        },
        {
          partyId: 'lfi',
          stance: 'maps_to_option',
          optionId: 'large',
          partialMatch: [],
          summary: {
            fr: "LFI a explicitement rejeté l'approche par métiers en tension, jugée « utilitariste », et demande la régularisation de tous les travailleurs sans papiers présents sur le territoire, sans condition de secteur. Le parti y ajoute la régularisation des parents d'enfants scolarisés.",
            en: 'LFI explicitly rejected the shortage-occupation approach as "utilitarian" and calls for regularising all undocumented workers present on the territory, with no sectoral condition. It adds regularisation of parents of school-age children.',
          },
          sources: [S.lfiRegul, S.lfiElysee],
          confidence: 'high',
        },
      ],
    },
    {
      id: 'ame',
      prompt: {
        fr: "Quel accès aux soins pour les personnes étrangères en situation irrégulière ?",
        en: 'What healthcare access should irregular migrants have?',
      },
      context: {
        fr: "L'aide médicale d'État (AME) couvre les soins des personnes sans titre de séjour résidant en France depuis plus de trois mois, sous condition de ressources. Sa suppression ou sa transformation en aide médicale d'urgence (AMU) revient dans le débat à chaque texte sur l'immigration.",
        en: 'State medical aid (AME) covers healthcare for undocumented people resident in France for over three months, subject to a means test. Abolishing it or converting it into emergency-only aid (AMU) returns in every immigration debate.',
      },
      options: [
        {
          id: 'supprimer',
          label: { fr: "Supprimer l'AME", en: 'Abolish the AME' },
          detail: {
            fr: "Supprimer le dispositif, ne laissant subsister que les soins délivrés en situation d'urgence vitale au titre du droit commun hospitalier.",
            en: 'Abolish the scheme, leaving only life-threatening emergency care under ordinary hospital rules.',
          },
        },
        {
          id: 'amu',
          label: { fr: "Transformer en aide médicale d'urgence", en: 'Convert to emergency medical aid' },
          detail: {
            fr: "Remplacer l'AME par une AMU au panier de soins nettement restreint, limité aux urgences, aux maladies graves et transmissibles et à la maternité.",
            en: 'Replace the AME with an emergency scheme covering a much narrower basket: emergencies, serious and communicable diseases, and maternity care.',
          },
        },
        {
          id: 'maintenir-controler',
          label: { fr: 'Maintenir avec contrôles renforcés', en: 'Keep with tighter controls' },
          detail: {
            fr: "Conserver l'AME dans son périmètre actuel en renforçant les contrôles anti-fraude et les conditions de résidence, sans réduire le panier de soins.",
            en: 'Keep the AME at its current scope while strengthening anti-fraud checks and residence conditions, without reducing the basket of care.',
          },
        },
        {
          id: 'maintenir-etendre',
          label: { fr: 'Maintenir et faciliter', en: 'Keep and widen access' },
          detail: {
            fr: "Conserver l'AME et lever les obstacles d'accès, en simplifiant les démarches et en supprimant les conditions ajoutées par les textes récents.",
            en: 'Keep the AME and remove barriers to access, simplifying procedures and dropping conditions added by recent legislation.',
          },
        },
      ],
      positions: [
        {
          partyId: 'rn',
          stance: 'maps_to_option',
          optionId: 'supprimer',
          partialMatch: [],
          summary: {
            fr: "Le RN propose la suppression de l'AME, présentée comme un volet de la priorité nationale dans l'accès aux prestations. Le programme ne prévoit pas de dispositif de remplacement au-delà du droit commun de l'urgence hospitalière.",
            en: 'The RN proposes abolishing the AME, presented as part of national preference in access to benefits. The platform provides no replacement scheme beyond ordinary emergency hospital care.',
          },
          sources: [S.rnSurligneurs, S.rn22],
          confidence: 'high',
        },
        {
          partyId: 'reconquete',
          stance: 'maps_to_option',
          optionId: 'supprimer',
          partialMatch: [],
          summary: {
            fr: "Reconquête défend la suppression de l'AME dans le cadre de sa politique d'immigration zéro et de restriction générale de l'accès des étrangers aux prestations sociales.",
            en: 'Reconquête supports abolishing the AME as part of its zero-immigration policy and general restriction of foreign nationals\' access to social benefits.',
          },
          sources: [S.zemmourZero],
          confidence: 'low',
        },
        {
          partyId: 'lr',
          stance: 'maps_to_option',
          optionId: 'amu',
          partialMatch: ['supprimer'],
          summary: {
            fr: "LR porte de longue date la transformation de l'AME en aide médicale d'urgence au panier de soins restreint. Le Sénat, à majorité de droite, a voté cette transformation lors de l'examen de la loi de 2024 avant que l'Assemblée ne rétablisse le dispositif.",
            en: 'LR has long advocated converting the AME into an emergency scheme with a narrower basket of care. The right-leaning Senate voted this change during the 2024 law before the National Assembly restored the existing scheme.',
          },
          sources: [S.lrDeuxPPL, S.metiersTension],
          confidence: 'medium',
        },
        {
          partyId: 'renaissance',
          stance: 'maps_to_option',
          optionId: 'maintenir-controler',
          partialMatch: [],
          summary: {
            fr: "Renaissance a défendu le maintien de l'AME lors de l'examen de la loi de 2024, l'Assemblée ayant rétabli l'article supprimé par le Sénat. Le parti accompagne ce maintien d'un discours sur le renforcement des contrôles.",
            en: 'Renaissance defended keeping the AME during the 2024 law, with the National Assembly restoring the article the Senate had deleted. The party pairs this with an emphasis on tighter controls.',
          },
          sources: [S.metiersTension, S.france24Legis],
          confidence: 'medium',
        },
        {
          partyId: 'horizons',
          stance: 'no_stated_position',
          optionId: null,
          partialMatch: [],
          summary: {
            fr: "Aucune position propre d'Horizons sur l'avenir de l'AME n'est documentée pour 2027, distincte de celle du camp présidentiel. Les prises de parole d'Édouard Philippe sur l'immigration portent sur le travail, l'immigration familiale et les OQTF.",
            en: 'No Horizons position on the future of the AME is documented for 2027 distinct from the presidential camp\'s. Édouard Philippe\'s public statements on immigration concern work, family migration and removal orders.',
          },
          sources: [],
          confidence: 'low',
        },
        {
          partyId: 'ps',
          stance: 'maps_to_option',
          optionId: 'maintenir-etendre',
          partialMatch: ['maintenir-controler'],
          summary: {
            fr: "Le PS a défendu au Parlement le rétablissement de l'AME après sa suppression par le Sénat, et demande plus largement l'abrogation des dispositions restrictives des lois récentes en matière d'accès aux droits sociaux.",
            en: 'The PS defended restoring the AME in Parliament after the Senate deleted it, and more broadly calls for repealing the restrictive provisions of recent laws on access to social rights.',
          },
          sources: [S.metiersTension, S.lcpTourHorizon],
          confidence: 'medium',
        },
        {
          partyId: 'ecologistes',
          stance: 'maps_to_option',
          optionId: 'maintenir-etendre',
          partialMatch: ['maintenir-controler'],
          summary: {
            fr: "Les Écologistes ont voté le rétablissement de l'AME et portent une politique d'accès aux soins sans condition de statut, en cohérence avec leur demande d'abrogation des lois immigration récentes.",
            en: 'The Ecologists voted to restore the AME and advocate healthcare access regardless of immigration status, consistent with their call to repeal recent immigration laws.',
          },
          sources: [S.metiersTension, S.nfpInfomigrants],
          confidence: 'medium',
        },
        {
          partyId: 'lfi',
          stance: 'maps_to_option',
          optionId: 'maintenir-etendre',
          partialMatch: [],
          summary: {
            fr: "LFI défend le maintien de l'AME et sa simplification, dans le cadre plus large d'une abrogation des lois restrictives et d'un accès inconditionnel aux soins. Le parti conteste le principe même d'un régime distinct du droit commun.",
            en: 'LFI supports keeping and simplifying the AME, within a broader repeal of restrictive laws and unconditional healthcare access. The party contests the very principle of a scheme separate from ordinary coverage.',
          },
          sources: [S.lfiElysee, S.nfpInfomigrants],
          confidence: 'medium',
        },
      ],
    },
    {
      id: 'regroupement-familial',
      prompt: {
        fr: 'Faut-il maintenir le droit de faire venir sa famille en France ?',
        en: 'Should the right to bring one\'s family to France be maintained?',
      },
      context: {
        fr: "Le regroupement familial permet à un étranger résidant régulièrement en France depuis au moins dix-huit mois de faire venir son conjoint et ses enfants mineurs, sous conditions de ressources et de logement. Ces conditions ont été durcies par la loi de janvier 2024.",
        en: 'Family reunification allows a foreign national lawfully resident for at least eighteen months to bring their spouse and minor children, subject to income and housing conditions. These were tightened by the January 2024 law.',
      },
      options: [
        {
          id: 'supprimer-rf',
          label: { fr: 'Supprimer le regroupement familial', en: 'Abolish family reunification' },
          detail: {
            fr: "Mettre fin au dispositif, ce qui suppose de se dégager des engagements européens et conventionnels protégeant le droit à la vie familiale.",
            en: 'End the scheme, which would require departing from European and treaty commitments protecting the right to family life.',
          },
        },
        {
          id: 'durcir-fort',
          label: { fr: 'Durcir fortement les conditions', en: 'Sharply tighten the conditions' },
          detail: {
            fr: "Conserver le droit mais allonger la durée de résidence préalable et relever les exigences de ressources, de logement et de maîtrise du français.",
            en: 'Keep the right but lengthen the prior residence requirement and raise the income, housing and French-language thresholds.',
          },
        },
        {
          id: 'durcir-modere',
          label: { fr: 'Maintenir le cadre de 2024', en: 'Keep the 2024 framework' },
          detail: {
            fr: "Conserver le dispositif tel que durci par la loi de janvier 2024, sans nouvelle restriction ni retour en arrière.",
            en: 'Keep the scheme as tightened by the January 2024 law, with no further restriction and no rollback.',
          },
        },
        {
          id: 'assouplir',
          label: { fr: 'Revenir sur les durcissements', en: 'Roll back the tightening' },
          detail: {
            fr: "Abroger les conditions ajoutées en 2024 et faciliter l'exercice effectif du droit à la vie familiale.",
            en: 'Repeal the conditions added in 2024 and make the right to family life easier to exercise in practice.',
          },
        },
      ],
      positions: [
        {
          partyId: 'rn',
          stance: 'maps_to_option',
          optionId: 'supprimer-rf',
          partialMatch: [],
          summary: {
            fr: "Le RN prévoit la fin du regroupement familial, présentée avec la suppression du droit du sol comme un moyen de mettre fin à l'immigration de peuplement. La mesure se heurte au droit européen, ce que le parti entend surmonter par référendum.",
            en: 'The RN plans to end family reunification, presented alongside abolishing birthright citizenship as a way to stop settlement migration. The measure conflicts with European law, which the party intends to overcome by referendum.',
          },
          sources: [S.rnSurligneurs, S.rnReferendum],
          confidence: 'high',
        },
        {
          partyId: 'reconquete',
          stance: 'maps_to_option',
          optionId: 'supprimer-rf',
          partialMatch: [],
          summary: {
            fr: "Reconquête inscrit la suppression du regroupement familial dans son objectif d'immigration zéro puis négative, avec un dispositif d'organisation des départs confié à un ministère dédié.",
            en: 'Reconquête includes abolishing family reunification within its zero-then-negative immigration objective, with departures organised by a dedicated ministry.',
          },
          sources: [S.zemmourZero, S.zemmourRemigration],
          confidence: 'medium',
        },
        {
          partyId: 'lr',
          stance: 'maps_to_option',
          optionId: 'durcir-fort',
          partialMatch: ['supprimer-rf'],
          summary: {
            fr: "LR propose de durcir substantiellement les conditions du regroupement familial plutôt que de le supprimer, dans le cadre d'un pilotage général de l'immigration par quotas votés au Parlement, hors asile et ressortissants européens.",
            en: 'LR proposes substantially tightening family reunification rather than abolishing it, within a general steering of immigration through parliamentary quotas, excluding asylum and EU nationals.',
          },
          sources: [S.lrConstit, S.lrDeuxPPL],
          confidence: 'medium',
        },
        {
          partyId: 'renaissance',
          stance: 'maps_to_option',
          optionId: 'durcir-modere',
          partialMatch: [],
          summary: {
            fr: "Renaissance défend les conditions issues de la loi de janvier 2024, qui a relevé les exigences de ressources, de logement et de durée de séjour préalable, sans remettre en cause le principe du droit.",
            en: 'Renaissance defends the conditions set by the January 2024 law, which raised income, housing and prior-residence requirements without challenging the principle of the right.',
          },
          sources: [S.loi2024, S.france24Legis],
          confidence: 'medium',
        },
        {
          partyId: 'horizons',
          stance: 'maps_to_option',
          optionId: 'durcir-fort',
          partialMatch: ['durcir-modere'],
          summary: {
            fr: "Édouard Philippe propose explicitement de limiter l'immigration familiale et d'en durcir les conditions d'accès, en contrepartie d'une immigration de travail assumée. C'est le pivot de sa doctrine migratoire.",
            en: 'Édouard Philippe explicitly proposes limiting family migration and tightening its conditions, in exchange for openly accepted labour migration. This trade-off is the pivot of his migration doctrine.',
          },
          sources: [S.philippeProgramme],
          confidence: 'medium',
        },
        {
          partyId: 'ps',
          stance: 'maps_to_option',
          optionId: 'assouplir',
          partialMatch: [],
          summary: {
            fr: "Le PS demande l'abrogation des dispositions restrictives des lois de 2018 et 2024, ce qui inclut les conditions ajoutées au regroupement familial. Il défend la carte de dix ans comme titre de droit commun, qui en faciliterait l'exercice.",
            en: 'The PS calls for repealing the restrictive provisions of the 2018 and 2024 laws, including the added family-reunification conditions. It advocates the ten-year card as the standard permit, which would ease its exercise.',
          },
          sources: [S.lcpTourHorizon],
          confidence: 'medium',
        },
        {
          partyId: 'ecologistes',
          stance: 'maps_to_option',
          optionId: 'assouplir',
          partialMatch: [],
          summary: {
            fr: "Les Écologistes portent l'abrogation des lois immigration récentes et une politique d'accueil davantage fondée sur l'accompagnement que sur la répression, ce qui inclut le retour sur les durcissements du regroupement familial.",
            en: 'The Ecologists advocate repealing recent immigration laws and a reception policy based on support rather than enforcement, including rolling back the family-reunification tightening.',
          },
          sources: [S.nfpInfomigrants, S.lcpTourHorizon],
          confidence: 'medium',
        },
        {
          partyId: 'lfi',
          stance: 'maps_to_option',
          optionId: 'assouplir',
          partialMatch: [],
          summary: {
            fr: "LFI demande l'abrogation des lois restrictives et défend le droit à la vie familiale sans conditions de ressources renforcées. Le parti y associe l'accueil inconditionnel des mineurs non accompagnés.",
            en: 'LFI calls for repealing the restrictive laws and defends the right to family life without heightened income conditions. It pairs this with unconditional reception of unaccompanied minors.',
          },
          sources: [S.nfpInfomigrants, S.lfiElysee],
          confidence: 'medium',
        },
      ],
    },
    {
      id: 'prestations-sociales',
      prompt: {
        fr: "Les étrangers en situation régulière doivent-ils avoir les mêmes droits sociaux que les Français ?",
        en: 'Should lawfully resident foreign nationals have the same social rights as French citizens?',
      },
      context: {
        fr: "La loi du 26 janvier 2024 a allongé les durées de résidence exigées pour accéder à certaines prestations non contributives. La « priorité nationale », qui réserverait ces prestations aux Français, se heurte au principe constitutionnel d'égalité.",
        en: 'The 26 January 2024 law lengthened the residence periods required for certain non-contributory benefits. "National preference", which would reserve them for French citizens, conflicts with the constitutional principle of equality.',
      },
      options: [
        {
          id: 'priorite-nationale',
          label: { fr: 'Priorité nationale', en: 'National preference' },
          detail: {
            fr: "Réserver les aides sociales, le logement social et l'accès à l'emploi aux citoyens français, ce qui suppose une révision de la Constitution ou un référendum.",
            en: 'Reserve social aid, social housing and job access for French citizens, which would require a constitutional revision or a referendum.',
          },
        },
        {
          id: 'delais-allonges',
          label: { fr: 'Allonger les délais de résidence', en: 'Lengthen residence requirements' },
          detail: {
            fr: "Maintenir l'égalité de principe mais conditionner les prestations non contributives à une durée de résidence ou de travail nettement plus longue.",
            en: 'Maintain formal equality but condition non-contributory benefits on a substantially longer period of residence or employment.',
          },
        },
        {
          id: 'cadre-2024',
          label: { fr: 'Maintenir le cadre de 2024', en: 'Keep the 2024 framework' },
          detail: {
            fr: "Conserver les conditions de durée introduites en janvier 2024, en renforçant la lutte contre la fraude sans nouvelle restriction.",
            en: 'Keep the duration conditions introduced in January 2024, strengthening anti-fraud enforcement without further restriction.',
          },
        },
        {
          id: 'egalite',
          label: { fr: 'Égalité des droits sociaux', en: 'Equal social rights' },
          detail: {
            fr: "Abroger les conditions de durée introduites récemment et garantir l'égalité d'accès aux prestations pour toute personne en situation régulière.",
            en: 'Repeal the recently introduced duration conditions and guarantee equal access to benefits for everyone lawfully resident.',
          },
        },
      ],
      positions: [
        {
          partyId: 'rn',
          stance: 'maps_to_option',
          optionId: 'priorite-nationale',
          partialMatch: [],
          summary: {
            fr: "La priorité nationale est au cœur du programme du RN : réservation des aides sociales aux Français et préférence nationale pour le logement social et l'accès à l'emploi. Le parti reconnaît que la mesure exige de passer par un référendum.",
            en: 'National preference is central to the RN platform: social aid reserved for French citizens and national preference for social housing and job access. The party accepts the measure requires going through a referendum.',
          },
          sources: [S.rn22, S.rnSurligneurs, S.rnReferendum],
          confidence: 'high',
        },
        {
          partyId: 'reconquete',
          stance: 'maps_to_option',
          optionId: 'priorite-nationale',
          partialMatch: [],
          summary: {
            fr: "Reconquête défend la priorité nationale dans l'accès aux prestations et au logement, en cohérence avec son objectif d'immigration négative. Le parti lie explicitement l'accès aux droits sociaux à la nationalité.",
            en: 'Reconquête supports national preference in access to benefits and housing, consistent with its negative-immigration objective. The party explicitly ties access to social rights to nationality.',
          },
          sources: [S.zemmourZero, S.zemmourRemigration],
          confidence: 'low',
        },
        {
          partyId: 'lr',
          stance: 'maps_to_option',
          optionId: 'delais-allonges',
          partialMatch: ['priorite-nationale'],
          summary: {
            fr: "LR a obtenu dans la loi de 2024 l'allongement des durées de résidence conditionnant l'accès aux prestations non contributives, et propose de constitutionnaliser la possibilité de traiter différemment nationaux et étrangers sur ce terrain.",
            en: 'LR secured longer residence requirements for non-contributory benefits in the 2024 law, and proposes constitutionalising the possibility of treating nationals and foreigners differently in this area.',
          },
          sources: [S.lrConstit, S.senatConstit],
          confidence: 'medium',
        },
        {
          partyId: 'renaissance',
          stance: 'maps_to_option',
          optionId: 'cadre-2024',
          partialMatch: [],
          summary: {
            fr: "Renaissance défend la ligne de la loi de janvier 2024 : durcissement des conditions de durée pour l'accès aux prestations, assorti du maintien du principe d'égalité et d'un effort sur la lutte contre la fraude.",
            en: 'Renaissance defends the January 2024 line: tighter duration conditions for benefit access, while maintaining the principle of equality and emphasising anti-fraud enforcement.',
          },
          sources: [S.france24Legis, S.loi2024],
          confidence: 'medium',
        },
        {
          partyId: 'horizons',
          stance: 'no_stated_position',
          optionId: null,
          partialMatch: [],
          summary: {
            fr: "Horizons n'a pas formulé pour 2027 de position distincte sur les conditions d'accès des étrangers aux prestations sociales. Les propositions d'Édouard Philippe portent sur le travail, l'immigration familiale et l'exécution des OQTF.",
            en: 'Horizons has set out no distinct 2027 position on foreign nationals\' access to social benefits. Édouard Philippe\'s proposals concern work, family migration and enforcement of removal orders.',
          },
          sources: [],
          confidence: 'low',
        },
        {
          partyId: 'ps',
          stance: 'maps_to_option',
          optionId: 'egalite',
          partialMatch: [],
          summary: {
            fr: "Le PS demande l'abrogation des dispositions restrictives des lois de 2018 et 2024, dont les conditions de durée conditionnant l'accès aux prestations, et défend l'égalité d'accès pour les personnes en situation régulière.",
            en: 'The PS calls for repealing the restrictive provisions of the 2018 and 2024 laws, including benefit duration conditions, and defends equal access for lawfully resident people.',
          },
          sources: [S.lcpTourHorizon],
          confidence: 'medium',
        },
        {
          partyId: 'ecologistes',
          stance: 'maps_to_option',
          optionId: 'egalite',
          partialMatch: [],
          summary: {
            fr: "Les Écologistes s'opposent à toute différenciation des droits sociaux fondée sur la nationalité et demandent l'abrogation des conditions de durée introduites par les textes récents.",
            en: 'The Ecologists oppose any differentiation of social rights based on nationality and call for repealing the duration conditions introduced by recent legislation.',
          },
          sources: [S.lcpTourHorizon, S.nfpInfomigrants],
          confidence: 'medium',
        },
        {
          partyId: 'lfi',
          stance: 'maps_to_option',
          optionId: 'egalite',
          partialMatch: [],
          summary: {
            fr: "LFI conteste frontalement le principe de la préférence nationale et demande l'égalité d'accès aux prestations, ainsi que le droit de vote des étrangers aux élections locales. Le parti demande l'abrogation des lois restrictives récentes.",
            en: 'LFI directly contests the principle of national preference and calls for equal access to benefits, along with voting rights for foreign residents in local elections. It calls for repealing recent restrictive laws.',
          },
          sources: [S.lfiElysee, S.nfpInfomigrants],
          confidence: 'medium',
        },
      ],
    },
    {
      id: 'voie-constitutionnelle',
      prompt: {
        fr: "Par quelle voie juridique la politique migratoire devrait-elle être décidée ?",
        en: 'Through what legal route should migration policy be decided?',
      },
      context: {
        fr: "Plusieurs mesures proposées — priorité nationale, suppression du droit du sol, fin du regroupement familial — sont jugées contraires à la Constitution ou aux engagements européens de la France. Les partis divergent sur la manière de lever cet obstacle, ou sur l'opportunité de le faire.",
        en: 'Several proposed measures — national preference, abolishing birthright citizenship, ending family reunification — are held to conflict with the Constitution or France\'s European commitments. Parties differ on how to remove that obstacle, or whether to try.',
      },
      options: [
        {
          id: 'referendum',
          label: { fr: 'Référendum sur l\'immigration', en: 'Referendum on immigration' },
          detail: {
            fr: "Soumettre directement la politique migratoire au référendum pour contourner les obstacles constitutionnels, quitte à assumer un conflit avec les engagements européens.",
            en: 'Put migration policy directly to referendum to bypass constitutional obstacles, accepting a conflict with European commitments.',
          },
        },
        {
          id: 'revision-constit',
          label: { fr: 'Révision constitutionnelle', en: 'Constitutional revision' },
          detail: {
            fr: "Réviser la Constitution par la voie parlementaire pour y inscrire des quotas votés annuellement, le principe d'assimilation et l'extension du champ référendaire.",
            en: 'Revise the Constitution through Parliament to enshrine annually voted quotas, the principle of assimilation, and an extended referendum scope.',
          },
        },
        {
          id: 'cadre-existant',
          label: { fr: 'Agir dans le cadre existant', en: 'Act within the existing framework' },
          detail: {
            fr: "Ne pas modifier la Constitution et conduire la politique migratoire par la loi ordinaire et la coopération européenne, notamment le Pacte sur la migration et l'asile.",
            en: 'Leave the Constitution unchanged and run migration policy through ordinary legislation and European cooperation, notably the Pact on Migration and Asylum.',
          },
        },
        {
          id: 'abroger',
          label: { fr: 'Abroger les lois restrictives', en: 'Repeal the restrictive laws' },
          detail: {
            fr: "Ne pas toucher à la Constitution et abroger par la loi ordinaire les dispositions restrictives adoptées depuis 2018.",
            en: 'Leave the Constitution untouched and repeal, through ordinary legislation, the restrictive provisions adopted since 2018.',
          },
        },
      ],
      positions: [
        {
          partyId: 'rn',
          stance: 'maps_to_option',
          optionId: 'referendum',
          partialMatch: ['revision-constit'],
          summary: {
            fr: "Le RN fait du référendum sur l'immigration la clé de voûte de son programme : il permettrait selon lui d'imposer la priorité nationale et la suppression du droit du sol malgré les obstacles constitutionnels. Le recours à l'article 11 pour cet objet est juridiquement contesté.",
            en: 'The RN makes a referendum on immigration the keystone of its platform: it would, in its view, impose national preference and abolish birthright citizenship despite constitutional obstacles. Using Article 11 for this purpose is legally contested.',
          },
          sources: [S.rnReferendum, S.rn22],
          confidence: 'high',
        },
        {
          partyId: 'reconquete',
          stance: 'maps_to_option',
          optionId: 'referendum',
          partialMatch: ['revision-constit'],
          summary: {
            fr: "Reconquête soutient également la voie référendaire pour imposer ses mesures migratoires, y compris la remigration, en assumant une rupture avec les engagements européens et conventionnels de la France.",
            en: 'Reconquête likewise backs the referendum route to impose its migration measures, including remigration, openly accepting a break with France\'s European and treaty commitments.',
          },
          sources: [S.zemmourRemigration],
          confidence: 'low',
        },
        {
          partyId: 'lr',
          stance: 'maps_to_option',
          optionId: 'revision-constit',
          partialMatch: ['referendum'],
          summary: {
            fr: "LR a déposé le 25 mai 2023 une proposition de loi constitutionnelle donnant au Parlement le pouvoir de fixer chaque année des quotas par catégorie, inscrivant le principe d'assimilation et étendant l'article 11 au référendum sur l'immigration.",
            en: 'On 25 May 2023 LR tabled a constitutional bill giving Parliament the power to set annual quotas by category, enshrining the principle of assimilation and extending Article 11 to referendums on immigration.',
          },
          sources: [S.lrConstit, S.senatConstit],
          confidence: 'high',
        },
        {
          partyId: 'renaissance',
          stance: 'maps_to_option',
          optionId: 'cadre-existant',
          partialMatch: [],
          summary: {
            fr: "Renaissance récuse la voie constitutionnelle et référendaire et défend une action par la loi ordinaire, dans le cadre du droit européen et du Pacte sur la migration et l'asile. La loi de janvier 2024 illustre cette méthode.",
            en: 'Renaissance rejects the constitutional and referendum routes, favouring ordinary legislation within European law and the Pact on Migration and Asylum. The January 2024 law exemplifies this method.',
          },
          sources: [S.france24Legis, S.loi2024],
          confidence: 'medium',
        },
        {
          partyId: 'horizons',
          stance: 'maps_to_option',
          optionId: 'cadre-existant',
          partialMatch: [],
          summary: {
            fr: "Édouard Philippe inscrit ses propositions dans le cadre juridique existant, en insistant sur l'exécution effective des OQTF et sur la normalisation des relations diplomatiques, notamment avec l'Algérie, pour lever les blocages aux éloignements.",
            en: 'Édouard Philippe frames his proposals within the existing legal framework, stressing effective enforcement of removal orders and normalising diplomatic relations, notably with Algeria, to unblock removals.',
          },
          sources: [S.philippeProgramme],
          confidence: 'medium',
        },
        {
          partyId: 'ps',
          stance: 'maps_to_option',
          optionId: 'abroger',
          partialMatch: [],
          summary: {
            fr: "Le PS ne propose aucune révision constitutionnelle et demande l'abrogation par la loi ordinaire des dispositions restrictives des textes de 2018 et 2023-2024, avec la carte de dix ans comme titre de droit commun.",
            en: 'The PS proposes no constitutional revision and calls for repealing, through ordinary legislation, the restrictive provisions of the 2018 and 2023-2024 texts, with the ten-year card as the standard permit.',
          },
          sources: [S.lcpTourHorizon],
          confidence: 'medium',
        },
        {
          partyId: 'ecologistes',
          stance: 'maps_to_option',
          optionId: 'abroger',
          partialMatch: [],
          summary: {
            fr: "Les Écologistes demandent l'abrogation des lois immigration récentes par la voie législative ordinaire et s'opposent à toute constitutionnalisation de restrictions migratoires.",
            en: 'The Ecologists call for repealing recent immigration laws through ordinary legislation and oppose writing any migration restrictions into the Constitution.',
          },
          sources: [S.lcpTourHorizon, S.nfpInfomigrants],
          confidence: 'medium',
        },
        {
          partyId: 'lfi',
          stance: 'maps_to_option',
          optionId: 'abroger',
          partialMatch: [],
          summary: {
            fr: "LFI demande l'abrogation des lois restrictives par la loi ordinaire. Le parti porte en revanche une révision constitutionnelle d'un autre ordre, pour instaurer le droit de vote des étrangers aux élections locales.",
            en: 'LFI calls for repealing the restrictive laws through ordinary legislation. It does however advocate a constitutional revision of a different kind, to establish voting rights for foreign residents in local elections.',
          },
          sources: [S.lfiElysee, S.nfpInfomigrants],
          confidence: 'medium',
        },
      ],
    },
  ],
};
