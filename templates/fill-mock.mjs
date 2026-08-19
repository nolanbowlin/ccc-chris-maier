/*
  Generates the -preview.html files from the -template.html files.

  Each template sits beside its preview in the same folder:

    corr-01-logo-band-template.html   the working file, with {{TOKENS}}
    corr-01-logo-band-preview.html    the same thing filled in, for approval

  Why a script and not twelve hand written copies: the template is the master.
  Change a layout there, re-run this, and the preview matches again. Hand
  written duplicates drift within a week. Never edit a -preview.html by hand,
  it gets overwritten.

  Run:  node fill-mock.mjs

  SOURCING. Almost everything below is real CCC content taken from Chris's own
  sends and the live site, so the approval set does not put invented claims in
  front of him. The exceptions are marked INVENTED and are limited to numbers
  CCC has not published: attendance counts, ticket prices, seats remaining and
  the quarterly stat strip.
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------- shared

const CHRIS_EMAIL = 'chris@contractorsclosersconnections.com'; // UNCONFIRMED, see HANDOFF.md
const BASE = {
  FIRST_NAME: 'Paul',
  CHRIS_EMAIL,
  CHRIS_EMAIL_DISPLAY: CHRIS_EMAIL.replace('@', '&#64;'),
  UNSUBSCRIBE_URL: 'https://www.contractorsclosersconnections.com/unsubscribe',
  PREFERENCES_URL: 'https://www.contractorsclosersconnections.com/preferences',
  SPONSORSHIP_URL: 'https://www.contractorsclosersconnections.com/sponsorship',
  GALLERY_URL: 'https://www.contractorsclosersconnections.com/gallery',
  CHAPTER_CITY: 'Atlanta',
};

// Real speakers, titles and firms as they appear on the Confluence speaker card.
// Note Stonemont Financial, not Stonemont: the announcement email shortened it.
// Hershberg is last on purpose: the six slot grid takes 1 through 6, and the
// intro copy names him as the seventh. Expand the grid and he moves into it.
const SPEAKERS = [
  ['Ken Lankford', 'Vice President', 'Stonemont Financial'],
  ['James Reid', 'Chief Executive Officer', 'Investa Capital'],
  ['Cesar Contreras', 'Founder', 'Aramar Investments'],
  ['Kris Bennett', 'Chief Operating Officer', 'QC Capital Flex Space'],
  ['Krut Patel', 'Chief Executive Officer', 'The Divine Group'],
  ['Raven Thompson', 'Principal', 'Southeast Housing Development Partners'],
  ['Marc A. Hershberg', 'Chief Executive Officer', 'Topaz Capital Group'],
];
const speakerTokens = () => {
  const o = {};
  SPEAKERS.forEach(([n, t, f], i) => {
    o[`SPEAKER_${i + 1}_NAME`] = n;
    o[`SPEAKER_${i + 1}_TITLE`] = t;
    o[`SPEAKER_${i + 1}_FIRM`] = f;
  });
  return o;
};

// Real platinum partners, read off CCC's own sponsor sheet. Fifteen of them.
// The sheet is the authority here, not the AI Revolution email, which listed a
// shorter set and abbreviated some names.
const PLATINUM = ['Intuit Enterprise Suite', 'Taillefer Commercial Group', 'Water Removal Services',
  'Hyatt Regency Villa Christina', 'Contineo Group', 'Insignia, LLC', 'Seyfarth Shaw LLP',
  'Corporate Environments', 'Pond &amp; Company', 'BP Fast Lending', 'Refined Parking Solutions',
  'PGS USA', 'StudioLensa', 'Envision Construction', 'KAZ Financial Group'];
const platinumTokens = () => Object.fromEntries(PLATINUM.map((n, i) => [`PLATINUM_${i + 1}`, n]));

// Real artwork, cut from CCC's own Confluence speaker card and sponsor sheet.
// The templates carry placeholders so they render on their own. The preview
// swaps them positionally: the Nth placeholder becomes the Nth real image.
const SPEAKER_IMG = ['marc-hershberg', 'ken-lankford', 'james-reid', 'cesar-contreras',
  'kris-bennett', 'krut-patel', 'raven-thompson'].map(s => `speaker-${s}.jpg`);
const SPONSOR_IMG = ['intuit-enterprise-suite', 'taillefer-commercial-group', 'water-removal-services',
  'hyatt-regency-villa-christina', 'contineo-group', 'insignia', 'seyfarth-shaw',
  'corporate-environments', 'pond-company', 'bp-fast-lending', 'refined-parking-solutions',
  'pgs-usa', 'studiolensa', 'envision-construction', 'kaz-financial-group'].map(s => `sponsor-${s}.jpg`);

// Member spotlight squares. Same faces off the speaker card, cut square rather
// than 3:4, because the spotlight row is a small avatar not a portrait card.
const MEMBER_IMG = ['kris-bennett', 'raven-thompson'].map(s => `member-${s}.jpg`);

// The lineup grid holds six, and Hershberg is named in the intro as the moderator,
// so his card is dropped from the grid rather than orphaning a seventh cell.
const speakerOrder = (skipHershberg) =>
  skipHershberg ? SPEAKER_IMG.filter(f => !f.includes('hershberg')) : SPEAKER_IMG;

function swapPlaceholders(html, { speakers = [], sponsors = [], members = [] }) {
  let i = 0, j = 0, k = 0;
  return html
    .replace(/placeholder-speaker\.jpg/g, () => speakers[i] ? speakers[i++] : (i++, 'placeholder-speaker.jpg'))
    .replace(/placeholder-sponsor\.jpg/g, () => sponsors[j] ? sponsors[j++] : (j++, 'placeholder-sponsor.jpg'))
    .replace(/placeholder-member\.jpg/g, () => members[k] ? members[k++] : (k++, 'placeholder-member.jpg'));
}

// Real gold partners, same sheet, in its reading order.
const GOLD = 'AMVAL Insurance Solutions, DeNyse Companies, ACCRE, Birdsey Group, '
  + 'Jaryd P. Green &amp; Associates, HRE Real Estate, Commercial Collection Corp. of NY, '
  + 'Eastern Companies, Allied Commercial Services, Touchmark National Bank, Forza Group, '
  + 'Bottom Line Generation, Keystone Land Surveying, JACO Contracting Solutions, '
  + 'Intersect Development Group, Strategic Claim Consultants, Total Mechanical Care, '
  + 'Growth 1031, Greenwood Group Landscape, T. D. Farrell Construction, '
  + 'Georgia Technology Systems, NOW CFO, Keystone Valuations, Primerica, '
  + 'Flood Brothers Commercial Services, Bouchard Farms, Braun Intertec, Insperity, '
  + 'The Graham Group, First Horizon Bank, Maniac, The Meticulous Maid, Loyal Trust Bank, '
  + 'EnRoads Paving, ARCO Design/Build, Surface Masters, North Georgia Landscape Management, '
  + 'Ironclaim, RE-SITE, GASKINS + LECRAW, WePartner Group, CoStar Group';

// Real events.
const CONFLUENCE = {
  EVENT_NAME: 'CCC &ldquo;Confluence&rdquo;',
  EVENT_TAGLINE_ONE_LINE: 'A private event for elite commercial real estate professionals.',
  EVENT_DATE_SHORT: 'August 27',
  EVENT_DAY_AND_DATE: 'Thursday, August 27, 2026',
  EVENT_TIME_RANGE: '10:00 AM to 2:00 PM',
  VENUE_NAME: 'City Winery',
  VENUE_STREET: '650 North Avenue NE',
  VENUE_CITY_STATE: 'Atlanta, GA',
  RSVP_URL: 'https://www.contractorsclosersconnections.com/confluence',
};

const BTR = {
  SUMMIT_NAME: 'Build to Rent Summit',
  EVENT_DATE_SHORT: 'November 10',
  EVENT_DAY_AND_DATE: 'Tuesday, November 10, 2026',
  EVENT_TIME_RANGE: '8:00 AM to 4:00 PM',
  VENUE_NAME: 'Venue to be confirmed',
  VENUE_STREET: '',
  VENUE_CITY_STATE: 'Atlanta, GA',
  TICKET_URL: 'https://www.contractorsclosersconnections.com/build-to-rent',
};

// ---------------------------------------------------------------- per file

const FILES = {

  'correspondence/corr-01-logo-band': {
    PREHEADER_ONE_LINE: 'Final head count for the Build to Rent Summit on November 10.',
    SUBJECT_AS_HEADLINE: 'Build to Rent Summit, November 10',
    PARAGRAPH_ONE: 'Do you still intend on joining us for the Build to Rent Summit on Tuesday, November 10th?',
    PARAGRAPH_TWO: 'We are getting to a final head count this week and I want to make sure we hold your seat in the ballroom if you are on board.',
    CTA_LABEL: 'Confirm My Seat',
    CTA_URL: BTR.TICKET_URL,
  },

  'correspondence/corr-02-logo-hero': {
    PREHEADER_ONE_LINE: 'Confluence is August 27 at City Winery. Seven speakers, four hours.',
    HERO_ALT_TEXT: 'CCC members at a recent chapter event',
    SUBJECT_AS_HEADLINE: 'Two Weeks Out From Confluence',
    PARAGRAPH_ONE: 'Confluence is on the 27th and the panel is set. Seven senior operators across affordable housing, multifamily, industrial, retail, hospitality and mixed use, in one room for four hours.',
    PARAGRAPH_TWO: 'The format is a rapid fire panel with generous networking on both sides of it. That second part is the reason most people come back.',
    EVENT_DATE: CONFLUENCE.EVENT_DAY_AND_DATE,
    EVENT_TIME: CONFLUENCE.EVENT_TIME_RANGE,
    EVENT_VENUE: CONFLUENCE.VENUE_NAME,
    EVENT_CITY: CONFLUENCE.VENUE_CITY_STATE,
    CTA_LABEL: 'Request an Invitation',
    CTA_URL: CONFLUENCE.RSVP_URL,
  },

  'correspondence/corr-03-letter': {
    PREHEADER_ONE_LINE: 'A quick introduction, and why I think the room is worth your time.',
    PARAGRAPH_ONE: 'We have not met, but we run in the same circles and your name has come up twice this month, so I would rather introduce myself than keep hearing about you secondhand.',
    PARAGRAPH_TWO: 'CCC runs private commercial real estate events in twenty markets. No booths, no badge scanning, no pitch from the stage. A panel of operators who are actually transacting, then a long stretch of unstructured networking that is the real product.',
    CLOSING_LINE_WITH_THE_ASK: 'If that sounds useful, tell me which market you are in and I will put you on the list for the next one.',
    CTA_LABEL: 'See upcoming events',
    CTA_URL: 'https://www.contractorsclosersconnections.com/events',
  },

  'correspondence/corr-04-hero-first': {
    PREHEADER_ONE_LINE: 'Twenty markets, and we have not seen you at one of them yet.',
    HERO_ALT_TEXT: 'Chris Maier addressing a CCC chapter event',
    EYEBROW: 'Twenty chapters and counting',
    HEADLINE: 'The Room Has Moved On Without You',
    PARAGRAPH_ONE: 'You came to a CCC event once, and then you did not come back. That is fine, but the network is not the same one you saw. We were in six markets. We are now in twenty.',
    PARAGRAPH_TWO: 'The next one in your market is close. Tell me you want in and I will hold a seat, no forms, no ticket page.',
    CTA_LABEL: 'Put Me Back on the List',
    CTA_URL: 'https://www.contractorsclosersconnections.com/events',
  },

  'correspondence/corr-05-split': {
    PREHEADER_ONE_LINE: 'Final head count for the Build to Rent Summit on November 10.',
    SUBJECT_AS_HEADLINE: 'Holding Your Seat',
    PARAGRAPH_ONE: 'Do you still intend on joining us for the Build to Rent Summit on Tuesday, November 10th?',
    PARAGRAPH_TWO: 'We are getting to a final head count this week. Say the word and the seat is yours, otherwise it goes back into the pool on Friday.',
    IMAGE_ALT_TEXT: 'Chris Maier addressing a CCC chapter event',
    IMAGE_CAPTION: 'Chris Maier, opening a CCC chapter event',
    CTA_LABEL: 'Confirm My Seat',
    CTA_URL: BTR.TICKET_URL,
  },

  'events/evt-01-invite-chapter': {
    ...CONFLUENCE,
    TIME_1: '10:00 AM',
    AGENDA_ITEM_1: 'Doors, coffee and open networking',
    TIME_2: '11:00 AM',
    AGENDA_ITEM_2: 'Rapid fire panel with seven senior CRE executives, moderated',
    TIME_3: '12:30 PM',
    AGENDA_ITEM_3: 'Lunch and unstructured networking through to close',
    WHAT_THIS_EVENT_IS_TWO_SENTENCES: 'CCC returns for a private commercial real estate event at City Winery, Ponce City Market. The program brings together a panel of senior executives with deep experience across affordable housing, multifamily, industrial, retail, hospitality and mixed use.',
    WHO_IS_IN_THE_ROOM_ONE_SENTENCE: 'Developers, investors, operators, brokers and the people who sign, alongside generous networking before and after the panel.',
  },

  'events/evt-02-invite-summit': {
    ...BTR,
    SUMMIT_POSITIONING_ONE_LINE: 'A full day on the capital, land and operations behind build to rent.',
    WHAT_THE_SUMMIT_IS_TWO_SENTENCES: 'The Build to Rent Summit is a full day rather than a morning, because the subject does not fit in a ninety minute panel. Capital stack, land strategy, horizontal development, property management at scale, and what the exit actually looks like right now.',
    WHY_THIS_ROOM_MATTERS_ONE_SENTENCE: 'Everyone on stage is currently building, financing or operating BTR product, not describing it from the outside.',
    SPEAKER_COUNT: '12',                    // INVENTED
    EXPECTED_ATTENDANCE: '300',             // INVENTED
    HOURS_OF_NETWORKING: '3',               // INVENTED
    TIER_1_NAME: 'General Admission',       // INVENTED pricing throughout
    TIER_1_INCLUDES: 'Full day access, breakfast, lunch, and the closing reception.',
    TIER_1_PRICE: '$295',
    TIER_2_NAME: 'Principal',
    TIER_2_INCLUDES: 'Everything in general admission, plus reserved ballroom seating and the pre-event capital roundtable.',
    TIER_2_PRICE: '$795',
    TIER_3_NAME: 'Event Sponsor',
    TIER_3_INCLUDES: 'Four seats, logo placement across the program and all event email, and a table in the networking hall.',
    TIER_3_PRICE: 'From $5,000',
    SEATS_REMAINING_LINE: 'Ballroom capacity is 300. Roughly a third is spoken for.',   // INVENTED
  },

  'events/evt-03-speaker-lineup': {
    __speakers: speakerOrder(true),
    ...CONFLUENCE,
    ...speakerTokens(),
    PANEL_POSITIONING_ONE_SENTENCE: 'Seven senior operators across affordable housing, multifamily, industrial, retail, hospitality and mixed use.',
    WHY_THIS_PANEL_TWO_SENTENCES: 'Each speaker brings a different background and a different position in the deal, so the conversation covers capital movement, market demand, development challenges, tenant behaviour and where opportunity is emerging next. Marc A. Hershberg of Topaz Capital Group joins the six below and moderates.',
    CTA_LABEL: 'Request an Invitation',
  },

  'events/evt-04-final-call': {
    ...CONFLUENCE,
    DAYS_OUT: 'Eight days out',
    ONE_SENTENCE_ON_WHERE_THE_LIST_STANDS: 'Confluence is a week from Thursday and the room is close to full.',
    ONE_SENTENCE_ASK: 'If you have been meaning to reply, now is the moment. One line back is enough and I will add you.',
    CTA_LABEL: 'Hold My Seat',
    SEATS_REMAINING_LINE: 'A handful of seats left at City Winery.',   // INVENTED
  },

  'events/evt-05-recap': {
    __sponsors: SPONSOR_IMG,
    ...platinumTokens(),
    EVENT_NAME: 'CCC &ldquo;AI Revolution&rdquo;',
    EVENT_DATE_SHORT: 'July 23',
    VENUE_NAME: '1277 Lenox Park Boulevard',
    ATTENDEE_COUNT: 'Over 400',              // INVENTED
    GOLD_SPONSOR_LIST_COMMA_SEPARATED: GOLD,
    WHAT_HAPPENED_TWO_SENTENCES: 'CCC engaged the commercial real estate community and made history hosting The AI Revolution in Buckhead. Four hours on what the technology actually changes for developers, operators and the people who underwrite them, with none of the usual hand waving.',
    THANK_YOU_TO_SPEAKERS_AND_HOSTS: 'Thank you to every AI expert, innovator and operator who served as a featured speaker, and to the sponsor partners who supported an undertaking this size.',
    NEXT_EVENT_NAME: 'CCC &ldquo;Confluence&rdquo;',
    NEXT_EVENT_DATE: 'Thursday, August 27',
    NEXT_EVENT_CITY: 'City Winery, Atlanta',
    NEXT_EVENT_URL: CONFLUENCE.RSVP_URL,
  },

  'events/evt-06-sponsor-thanks': {
    __sponsors: SPONSOR_IMG,
    ...platinumTokens(),
    YEAR: '2026',
    NEXT_YEAR: '2027',
    SPONSOR_COUNT: '60',
    CHAPTER_COUNT: '20',
    EVENT_COUNT: '40',                       // INVENTED
    GOLD_SPONSOR_LIST_COMMA_SEPARATED: GOLD,
    THANK_YOU_PARAGRAPH: 'CCC does not charge at the door for chapter events, which means the room exists because these firms decided it was worth paying for. Every panel, every venue and every reception this year traces back to the partners below.',
    PARTNER_BENEFIT_1: 'Logo placement across the program, the event email and the chapter site, in every market you select.',
    PARTNER_BENEFIT_2: 'Seats at every event in your markets, so your team is in the room rather than on a banner.',
    PARTNER_BENEFIT_3: 'First refusal on speaking slots where your firm has something specific to say.',
  },

  'newsletter/ccc-quarterly-newsletter': {
    __speakers: speakerOrder(true),
    __sponsors: SPONSOR_IMG,
    __members: MEMBER_IMG,
    ...platinumTokens(),
    ...speakerTokens(),
    QUARTER: 'Q3',
    YEAR: '2026',
    PREHEADER_ONE_LINE_SUMMARY: 'Twenty chapters, the AI Revolution recap, and what is next in your market.',
    QUARTER_HEADLINE: 'Twenty Chapters, One Network',
    QUARTER_STANDFIRST_ONE_SENTENCE: 'What CCC ran this quarter, who was on stage, and where the network goes next.',
    FOUNDER_LETTER_PARAGRAPH_ONE: 'When CCC started, the pitch was simple. Put the people who build, finance and operate commercial real estate in one room, take out the booths and the badge scanning, and let the conversation do the work. That has not changed. What has changed is how many rooms there are.',
    FOUNDER_LETTER_PARAGRAPH_TWO: 'We are in twenty markets now. If yours is on the list at the bottom of this email and you have not been to one yet, reply and I will get you in.',
    NEXT_EVENT_NAME: 'CCC &ldquo;Confluence&rdquo;',
    NEXT_EVENT_DESCRIPTION_TWO_SENTENCES: 'A private commercial real estate event at City Winery, Ponce City Market. A rapid fire panel of senior executives across affordable housing, multifamily, industrial, retail, hospitality and mixed use, with generous networking on both sides of it.',
    NEXT_EVENT_DATE: 'Thursday, August 27, 2026',
    NEXT_EVENT_TIME: '10:00 AM to 2:00 PM',
    NEXT_EVENT_VENUE: 'City Winery',
    NEXT_EVENT_ADDRESS: '650 North Avenue NE, Atlanta GA',
    NEXT_EVENT_URL: CONFLUENCE.RSVP_URL,
    EVENTS_HELD_COUNT: 'Eleven',             // INVENTED
    ATTENDEE_COUNT: '2,400',                 // INVENTED
    STAT_1_NUMBER: '11',  STAT_1_LABEL: 'Events Held',          // INVENTED
    STAT_2_NUMBER: '2,400', STAT_2_LABEL: 'Seats Filled',        // INVENTED
    STAT_3_NUMBER: '60',  STAT_3_LABEL: 'Sponsor Partners',      // INVENTED
    RECAP_1_DATE: 'July 23', RECAP_1_CITY: 'Atlanta',
    RECAP_1_EVENT_NAME: 'The AI Revolution',
    RECAP_1_ONE_SENTENCE: 'Four hours on what the technology actually changes for developers, operators and the people who underwrite them.',
    RECAP_1_GALLERY_URL: BASE.GALLERY_URL,
    RECAP_2_DATE: 'June 18', RECAP_2_CITY: 'Nashville',
    RECAP_2_EVENT_NAME: 'Chapter Launch',
    RECAP_2_ONE_SENTENCE: 'The Nashville chapter opened to a full room, which is the fastest a new market has filled.',
    RECAP_2_GALLERY_URL: BASE.GALLERY_URL,
    RECAP_3_DATE: 'May 21', RECAP_3_CITY: 'Dallas',
    RECAP_3_EVENT_NAME: 'Small Bay Industrial Summit',
    RECAP_3_ONE_SENTENCE: 'A full session on small bay industrial and industrial outdoor storage, the asset class nobody was talking about two years ago.',
    RECAP_3_GALLERY_URL: BASE.GALLERY_URL,
    SPEAKERS_INTRO_ONE_SENTENCE: 'A sample of who took a CCC stage this quarter.',
    CHAPTER_REPORT_PARAGRAPH: 'CCC now runs in twenty markets. Nashville, Boston, Savannah and Beverly Hills came online this year, and each one launched the same way: a founding group of operators who wanted the room to exist in their city, then a first event that filled on word of mouth. If your market is not on the list and you think it should be, that conversation starts with a reply to this email.',
    MEMBER_1_NAME: 'Kris Bennett',
    MEMBER_1_TITLE: 'Chief Operating Officer', MEMBER_1_FIRM: 'QC Capital Flex Space',
    MEMBER_1_ONE_SENTENCE: 'Leads strategy in alternative real estate with a focus on flex industrial, emphasising disciplined operations and long term value creation.',
    MEMBER_2_NAME: 'Raven Thompson',
    MEMBER_2_TITLE: 'Principal', MEMBER_2_FIRM: 'Southeast Housing Development Partners',
    MEMBER_2_ONE_SENTENCE: 'Focused on affordable housing and public private partnerships, with LIHTC and tax exempt bond developments totalling more than $200M.',
    GOLD_SPONSOR_LIST_COMMA_SEPARATED: GOLD,
  },
};

// ---------------------------------------------------------------- run

const BANNER = (base) => `<!--
  ================================================================
  PREVIEW. Generated by fill-mock.mjs, do not hand edit.
  Source: ${path.basename(base)}-template.html
  Event details, speakers and sponsor lists are real CCC content.
  Attendance figures, ticket prices and seat counts are illustrative.
  ================================================================
-->
`;

let count = 0, leftovers = [];
for (const [base, data] of Object.entries(FILES)) {
  const srcPath = path.join(HERE, `${base}-template.html`);
  const src = fs.readFileSync(srcPath, 'utf8');
  const map = { ...BASE, ...data };
  let out = src.replace(/\{\{([A-Z0-9_]+)\}\}/g, (m, k) =>
    Object.prototype.hasOwnProperty.call(map, k) ? map[k] : m);

  out = swapPlaceholders(out, {
    speakers: data.__speakers || [],
    members: data.__members || [],
    sponsors: data.__sponsors || [],
  });

  const missed = [...new Set((out.match(/\{\{[A-Z0-9_]+\}\}/g) || []))];
  if (missed.length) leftovers.push(`${base}: ${missed.join(', ')}`);

  out = out.replace(/(<body[^>]*>)/, `$1\n${BANNER(base)}`);

  fs.writeFileSync(path.join(HERE, `${base}-preview.html`), out);
  count++;
}

console.log(`wrote ${count} -preview.html files beside their templates`);
if (leftovers.length) {
  console.log('\nUNFILLED TOKENS:');
  leftovers.forEach(l => console.log('  ' + l));
} else {
  console.log('every token resolved');
}
