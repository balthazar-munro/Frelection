import type { Party } from '../lib/schema';

/**
 * INCLUSION CRITERIA (published on /methodologie, applied mechanically):
 * a party appears if it either
 *   (a) polls at or above 2% in the rolling average of first-round voting
 *       intentions for 2027, or
 *   (b) holds a group in the Assemblée nationale.
 *
 * Candidate status is deliberately a mutable attribute of the party rather
 * than the primary key. The PS designates on 2026-10-10 and the
 * Écologistes/Debout! primary runs 2026-10-11, so several of these fields are
 * expected to change before the dataset is next cut.
 */
export const parties: Party[] = [
  {
    id: 'lfi',
    name: { fr: 'La France insoumise', en: 'La France insoumise' },
    shortName: 'LFI',
    family: 'gauche-radicale',
    color: '#CC2443',
    candidate: {
      name: 'Jean-Luc Mélenchon',
      status: 'declared',
      asOf: '2026-08-17',
    },
    inclusionReason: {
      fr: "Groupe à l'Assemblée nationale et intentions de vote supérieures à 2 %.",
      en: 'Group in the National Assembly and polling above 2%.',
    },
  },
  {
    id: 'ecologistes',
    name: { fr: 'Les Écologistes', en: 'The Ecologists' },
    shortName: 'LE',
    family: 'ecologiste',
    color: '#00C000',
    candidate: {
      name: 'Non désigné',
      status: 'undesignated',
      asOf: '2026-08-17',
      note: {
        fr: "Primaire de la gauche unitaire (avec Debout !) prévue le 11 octobre 2026 ; le PS n'y participe pas.",
        en: 'Unified left primary (with Debout!) scheduled for 11 October 2026; the PS is not taking part.',
      },
    },
    inclusionReason: {
      fr: "Groupe à l'Assemblée nationale.",
      en: 'Group in the National Assembly.',
    },
  },
  {
    id: 'ps',
    name: { fr: 'Parti socialiste', en: 'Socialist Party' },
    shortName: 'PS',
    family: 'gauche',
    color: '#FF8080',
    candidate: {
      name: 'Non désigné',
      status: 'undesignated',
      asOf: '2026-08-17',
      note: {
        fr: 'Primaire fermée aux adhérents socialistes, désignation le 10 octobre 2026.',
        en: 'Closed primary among Socialist members, designation on 10 October 2026.',
      },
    },
    inclusionReason: {
      fr: "Groupe à l'Assemblée nationale.",
      en: 'Group in the National Assembly.',
    },
  },
  {
    id: 'renaissance',
    name: { fr: 'Renaissance', en: 'Renaissance' },
    shortName: 'RE',
    family: 'centre',
    color: '#FFA500',
    candidate: {
      name: 'Non désigné',
      status: 'undesignated',
      asOf: '2026-08-17',
    },
    inclusionReason: {
      fr: "Groupe à l'Assemblée nationale.",
      en: 'Group in the National Assembly.',
    },
  },
  {
    id: 'horizons',
    name: { fr: 'Horizons', en: 'Horizons' },
    shortName: 'HOR',
    family: 'centre',
    color: '#35A2E0',
    candidate: {
      name: 'Édouard Philippe',
      status: 'declared',
      asOf: '2026-08-17',
      note: {
        fr: 'Candidat déclaré depuis 2024.',
        en: 'Declared candidate since 2024.',
      },
    },
    inclusionReason: {
      fr: "Groupe à l'Assemblée nationale et intentions de vote supérieures à 2 %.",
      en: 'Group in the National Assembly and polling above 2%.',
    },
  },
  {
    id: 'lr',
    name: { fr: 'Les Républicains', en: 'The Republicans' },
    shortName: 'LR',
    family: 'droite',
    color: '#0066CC',
    candidate: {
      name: 'Non désigné',
      status: 'undesignated',
      asOf: '2026-08-17',
    },
    inclusionReason: {
      fr: "Groupe à l'Assemblée nationale.",
      en: 'Group in the National Assembly.',
    },
  },
  {
    id: 'rn',
    name: { fr: 'Rassemblement national', en: 'National Rally' },
    shortName: 'RN',
    family: 'droite-nationale',
    color: '#4472CA',
    candidate: {
      name: 'Marine Le Pen',
      status: 'declared',
      asOf: '2026-08-17',
      note: {
        fr: "Candidature annoncée le 7 juillet 2026 après l'arrêt d'appel ramenant sa peine d'inéligibilité, purgée en juin 2026. Un pourvoi en cassation est pendant.",
        en: 'Candidacy announced on 7 July 2026 after the appeal ruling reduced her ineligibility sentence, served by June 2026. An appeal to the Cour de cassation is pending.',
      },
    },
    inclusionReason: {
      fr: "Groupe à l'Assemblée nationale et premier rang dans les intentions de vote.",
      en: 'Group in the National Assembly and leading in voting intentions.',
    },
  },
  {
    id: 'reconquete',
    name: { fr: 'Reconquête', en: 'Reconquest' },
    shortName: 'REC',
    family: 'droite-nationale',
    color: '#8A8A8A',
    candidate: {
      name: 'Éric Zemmour',
      status: 'presumed',
      asOf: '2026-08-17',
    },
    inclusionReason: {
      fr: 'Intentions de vote supérieures à 2 %.',
      en: 'Polling above 2%.',
    },
  },
];
