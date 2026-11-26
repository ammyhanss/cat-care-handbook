export type Lang = 'zh-TW' | 'en' | 'zh-CN' | 'ja';

export type Status = 'draft' | 'literature-checked' | 'vet-reviewed';
export type Urgency = 'emergency' | 'soon' | 'monitor';

export function langOf(bcp47: string | undefined): Lang {
  if (bcp47 === 'en') return 'en';
  if (bcp47 === 'zh-CN') return 'zh-CN';
  if (bcp47 === 'ja') return 'ja';
  return 'zh-TW';
}

type Copy = {
  disclaimer: string;
  draftNotice: string;
  statusLabel: string;
  urgencyLabel: string;
  updatedLabel: string;
  verifiedLabel: string;
  reviewedLabel: string;
  notVetReviewed: string;
  englishNameLabel: string;
  englishTitleLabel: string;
  status: Record<Status, string>;
  urgency: Record<Urgency, string>;
  searchTitle: string;
  searchHint: string;
  searchButton: string;
  urgentTitle: string;
  urgentLead: string;
  urgentItems: string[];
  urgentMore: string;
  diseaseTitle: string;
  diseaseLead: string;
  systemTitle: string;
  systemLead: string;
  systems: Record<string, string>;
  guideTitle: string;
  guideLead: string;
  guidePages: Record<string, string>;
  footerDisclaimer: string;
  footerLicense: string;
  footerContributing: string;
  footerReviewers: string;
  footerAbout: string;
};

const systems = {
  oral: {
    'zh-TW': '消化與口腔',
    en: 'Digestive and oral',
    'zh-CN': '消化与口腔',
    ja: '消化器・口腔',
  },
  urinary: {
    'zh-TW': '泌尿',
    en: 'Urinary',
    'zh-CN': '泌尿',
    ja: '泌尿器',
  },
  endocrine: {
    'zh-TW': '內分泌',
    en: 'Endocrine',
    'zh-CN': '内分泌',
    ja: '内分泌',
  },
  infectious: {
    'zh-TW': '感染',
    en: 'Infectious disease',
    'zh-CN': '感染',
    ja: '感染症',
  },
  cardiovascular: {
    'zh-TW': '心血管',
    en: 'Cardiovascular',
    'zh-CN': '心血管',
    ja: '循環器',
  },
  respiratory: {
    'zh-TW': '呼吸',
    en: 'Respiratory',
    'zh-CN': '呼吸',
    ja: '呼吸器',
  },
  skin: {
    'zh-TW': '皮膚',
    en: 'Skin',
    'zh-CN': '皮肤',
    ja: '皮膚',
  },
  eyes: {
    'zh-TW': '眼',
    en: 'Eyes',
    'zh-CN': '眼',
    ja: '眼',
  },
  musculoskeletal: {
    'zh-TW': '肌肉骨骼',
    en: 'Musculoskeletal',
    'zh-CN': '骨骼肌肉',
    ja: '筋骨格',
  },
  toxicology: {
    'zh-TW': '中毒與急症',
    en: 'Toxicology and emergency',
    'zh-CN': '中毒与急症',
    ja: '中毒・救急',
  },
} as const;

function systemMap(lang: Lang): Record<string, string> {
  return Object.fromEntries(Object.entries(systems).map(([key, names]) => [key, names[lang]]));
}

export const ui: Record<Lang, Copy> = {
  'zh-TW': {
    disclaimer:
      '本頁提供飼主教育資訊，不能取代獸醫診療，也不能用來自行診斷或決定藥物劑量。貓咪不適時，請聯絡獸醫。',
    draftNotice: '這篇是草稿，目前只有大綱，不能當成完整照護說明。',
    statusLabel: '審核狀態',
    urgencyLabel: '就醫時機',
    updatedLabel: '內容日期',
    verifiedLabel: '文獻核對',
    reviewedLabel: '審核者',
    notVetReviewed: '尚未經獸醫審讀。已查文獻不是獸醫已審。',
    englishNameLabel: '英文病名',
    englishTitleLabel: '英文標題',
    status: {
      draft: '草稿',
      'literature-checked': '已查文獻',
      'vet-reviewed': '獸醫已審',
    },
    urgency: {
      emergency: '立刻就醫',
      soon: '盡快就醫',
      monitor: '先觀察並聯絡獸醫',
    },
    searchTitle: '我的貓現在怎麼了？',
    searchHint: '用症狀或病名搜尋，例如流口水、不吃、肚子變大。搜尋會打開站內搜尋。',
    searchButton: '搜尋症狀或病名',
    urgentTitle: '立刻就醫',
    urgentLead: '出現下面任一情況，請立刻聯絡獸醫或急診，不要等到隔天，也不要先給人類藥品。',
    urgentItems: [
      '公貓反覆進砂盆、排尿時叫，或幾乎沒有尿。母貓突然完全排不出尿也一樣緊急。',
      '張口呼吸，或休息時呼吸很快、很費力。',
      '後肢突然無力、拖行或癱瘓。',
      '抽搐，或突然站不起來、失去意識。',
      '大約 24 小時幾乎沒有進食。',
      '可能舔到或吃到百合，或接觸狗用滴劑裡的百滅寧、對乙醯胺酚、乙二醇、殺鼠藥。',
      '倒下，牙齦呈白色、灰色或藍色，或出血止不住。',
      '反覆嘔吐，同時精神差、肚子脹或痛，或可能吞了線、橡皮筋等異物。',
    ],
    urgentMore: '看完整的立刻就醫說明',
    diseaseTitle: '疾病',
    diseaseLead: '先從飼主最常遇到、也最需要分辨輕重的八種開始。標籤會標出草稿或已查文獻，以及建議的就醫時機。',
    systemTitle: '依身體系統瀏覽',
    systemLead: '分類方式接近獸醫手冊。還沒寫到的系統只有簡介。',
    systems: systemMap('zh-TW'),
    guideTitle: '新手養貓指引',
    guideLead: '還沒養過貓的人，可以先從這裡看。每一頁都對過文獻，還沒有獸醫審讀，也不能取代看診。',
    guidePages: {
      'before-arrival': '接貓回家之前',
      'first-weeks': '最初幾天與幾週',
      'vaccines-and-parasites': '疫苗、寄生蟲與第一次看診',
      neutering: '絕育',
      'food-and-body': '食物、飲水與體態',
      litter: '貓砂盆',
      environment: '環境與行為需求',
      'pain-and-illness': '辨認疼痛與生病',
      'choosing-a-vet': '怎麼選獸醫',
      'life-stages': '生命階段與定期檢查',
    },
    footerDisclaimer: '不能取代獸醫診療，不提供處方劑量。',
    footerLicense: '內容 CC BY-SA 4.0，程式碼 MIT',
    footerContributing: '如何貢獻',
    footerReviewers: '審核獸醫',
    footerAbout: '關於本站',
  },
  en: {
    disclaimer:
      'This page is owner education. It does not replace a veterinary examination, and it is not for home diagnosis or prescription dosing. Contact a veterinarian if your cat is unwell.',
    draftNotice: 'This page is a draft outline, not a complete care guide.',
    statusLabel: 'Review status',
    urgencyLabel: 'When to see a vet',
    updatedLabel: 'Content date',
    verifiedLabel: 'Claims checked',
    reviewedLabel: 'Reviewed by',
    notVetReviewed: 'A veterinarian has not reviewed this page. Literature checked is not vet reviewed.',
    englishNameLabel: 'English name',
    englishTitleLabel: 'English title',
    status: {
      draft: 'Draft',
      'literature-checked': 'Literature checked',
      'vet-reviewed': 'Vet reviewed',
    },
    urgency: {
      emergency: 'See a vet now',
      soon: 'See a vet soon',
      monitor: 'Monitor and call a vet',
    },
    searchTitle: 'What is going on with my cat?',
    searchHint: 'Search a sign or disease name, such as drooling, not eating, or a swollen belly. This opens site search.',
    searchButton: 'Search signs or diseases',
    urgentTitle: 'See a vet now',
    urgentLead:
      'If any of these is happening, contact a veterinarian or emergency clinic now. Do not wait overnight, and do not give human medicines.',
    urgentItems: [
      'A male cat makes repeated trips to the litter box, cries while trying to urinate, or passes little or no urine. A female cat that suddenly cannot pass any urine is an emergency too.',
      'Open-mouth breathing, or breathing that is fast or labored while the cat is resting.',
      'Sudden weakness, dragging, or paralysis of the hind legs.',
      'A seizure, or a cat that suddenly cannot stand or loses consciousness.',
      'Almost no food for about 24 hours.',
      'Possible lily exposure, or contact with permethrin from a dog flea product, acetaminophen, ethylene glycol, or rodenticide.',
      'Collapse, gums that are white, grey, or blue, or bleeding that will not stop.',
      'Repeated vomiting together with weakness, a swollen or painful belly, or possible ingestion of string or another foreign body.',
    ],
    urgentMore: 'Read the full emergency list',
    diseaseTitle: 'Diseases',
    diseaseLead:
      'These eight conditions are the first set: common, painful, or easy to underestimate. Badges show review status and how quickly to seek care.',
    systemTitle: 'Browse by body system',
    systemLead: 'The groups follow a veterinary handbook layout. Systems without a finished page have a short introduction only.',
    systems: systemMap('en'),
    guideTitle: 'First-time cat owner guide',
    guideLead:
      'Start here if you have never lived with a cat. Each page was checked against the guidelines it cites. A veterinarian has not reviewed them, and they do not replace a visit.',
    guidePages: {
      'before-arrival': 'Before you bring a cat home',
      'first-weeks': 'The first days and weeks',
      'vaccines-and-parasites': 'Vaccination, parasites, and the first visit',
      neutering: 'Neutering',
      'food-and-body': 'Food, water, and body condition',
      litter: 'Litter boxes',
      environment: 'Environment and behavior',
      'pain-and-illness': 'Recognizing pain and illness',
      'choosing-a-vet': 'Choosing a vet',
      'life-stages': 'Life stages and check-ups',
    },
    footerDisclaimer: 'Not a substitute for a veterinarian. No prescription doses.',
    footerLicense: 'Content CC BY-SA 4.0, code MIT',
    footerContributing: 'Contributing',
    footerReviewers: 'Reviewers',
    footerAbout: 'About',
  },
  'zh-CN': {
    disclaimer:
      '本页提供养猫人教育信息，不能取代兽医诊疗，也不能用来自行诊断或决定药物剂量。猫不舒服时，请联系兽医。',
    draftNotice: '这篇是草稿，目前只有大纲，不能当成完整照护说明。',
    statusLabel: '审阅状态',
    urgencyLabel: '就医时机',
    updatedLabel: '内容日期',
    verifiedLabel: '文献核对',
    reviewedLabel: '审阅者',
    notVetReviewed: '尚未经兽医审读。已查文献不是兽医已审。',
    englishNameLabel: '英文病名',
    englishTitleLabel: '英文标题',
    status: {
      draft: '草稿',
      'literature-checked': '已查文献',
      'vet-reviewed': '兽医已审',
    },
    urgency: {
      emergency: '立刻就医',
      soon: '尽快就医',
      monitor: '先观察并联系兽医',
    },
    searchTitle: '我的猫现在怎么了？',
    searchHint: '用症状或病名搜索，例如流口水、不吃、肚子变大。搜索会打开站内搜索。',
    searchButton: '搜索症状或病名',
    urgentTitle: '立刻就医',
    urgentLead: '出现下面任一情况，请立刻联系兽医或急诊，不要等到第二天，也不要先给人类药品。',
    urgentItems: [
      '公猫反复进砂盆、排尿时叫，或几乎没有尿。母猫突然完全排不出尿也同样紧急。',
      '张口呼吸，或休息时呼吸很快、很费力。',
      '后肢突然无力、拖行或瘫痪。',
      '抽搐，或突然站不起来、失去意识。',
      '大约 24 小时几乎没有进食。',
      '可能舔到或吃到百合，或接触狗用滴剂里的氯菊酯、对乙酰氨基酚、乙二醇、杀鼠药。',
      '倒下，牙龈呈白色、灰色或蓝色，或出血止不住。',
      '反复呕吐，同时精神差、肚子胀或痛，或可能吞了线、橡皮筋等异物。',
    ],
    urgentMore: '看完整的立刻就医说明',
    diseaseTitle: '疾病',
    diseaseLead: '先从养猫人最常遇到、也最需要分辨轻重的八种开始。标签会标出草稿或已查文献，以及建议的就医时机。',
    systemTitle: '按身体系统浏览',
    systemLead: '分类方式接近兽医手册。还没写到的系统只有简介。',
    systems: systemMap('zh-CN'),
    guideTitle: '新手养猫指南',
    guideLead: '还没养过猫的人，可以先从这里看。每一页都核对过文献，还没有兽医审读，也不能取代看诊。',
    guidePages: {
      'before-arrival': '接猫回家之前',
      'first-weeks': '最初几天与几周',
      'vaccines-and-parasites': '疫苗、寄生虫与第一次看诊',
      neutering: '绝育',
      'food-and-body': '食物、饮水和体态',
      litter: '猫砂盆',
      environment: '环境与行为需求',
      'pain-and-illness': '辨认疼痛与生病',
      'choosing-a-vet': '怎么选兽医',
      'life-stages': '生命阶段与定期检查',
    },
    footerDisclaimer: '不能取代兽医诊疗，不提供处方剂量。',
    footerLicense: '内容 CC BY-SA 4.0，代码 MIT',
    footerContributing: '如何贡献',
    footerReviewers: '审阅兽医',
    footerAbout: '关于本站',
  },
  ja: {
    disclaimer:
      'このページは飼い主向けの説明です。獣医師の診察に代わるものではなく、自分で診断したり、薬の用量を決めたりするためには使えません。猫の具合が悪いときは動物病院に連絡してください。',
    draftNotice: 'このページは下書きの見出しだけで、完全な介護説明ではありません。',
    statusLabel: '確認状況',
    urgencyLabel: '受診の目安',
    updatedLabel: '内容の日付',
    verifiedLabel: '文献の照合',
    reviewedLabel: '確認者',
    notVetReviewed: '獣医師はまだこのページを確認していません。文献確認済みは、獣医師確認済みではありません。',
    englishNameLabel: '英語の病名',
    englishTitleLabel: '英語の題名',
    status: {
      draft: '下書き',
      'literature-checked': '文献確認済み',
      'vet-reviewed': '獣医師確認済み',
    },
    urgency: {
      emergency: '直ちに受診',
      soon: '早めに受診',
      monitor: '様子を見て病院に相談',
    },
    searchTitle: 'うちの猫は今どうしている？',
    searchHint: 'よだれ、食べない、お腹が張る、など症状や病名で検索します。サイト内検索が開きます。',
    searchButton: '症状か病名を検索',
    urgentTitle: '直ちに受診',
    urgentLead:
      '次のどれかがあれば、夜を待たずに動物病院か救急に連絡してください。人の薬は与えないでください。',
    urgentItems: [
      'オス猫がトイレを何度も行き来する、排尿時に鳴く、尿がほとんど出ない。メス猫が急に尿を全く出せなくなった場合も救急です。',
      '口を開けて呼吸する、または安静時の呼吸が速い、苦しそう。',
      '後ろ足が急に弱る、引きずる、動かない。',
      'けいれん、または急に立てない、意識がない。',
      'およそ 24 時間、ほとんど食べていない。',
      'ユリをなめた、食べた可能性がある。犬用ノミ薬のペルメトリン、アセトアミノフェン、エチレングリコール、殺鼠剤に触れた可能性がある。',
      '倒れる、歯ぐきが白い、灰色、または青い。出血が止まらない。',
      '繰り返し吐き、元気がない、お腹が張る、痛がる。糸や輪ゴムなどを飲み込んだ可能性がある。',
    ],
    urgentMore: '直ちに受診する状態の一覧',
    diseaseTitle: '病気',
    diseaseLead:
      '最初の八つは、飼い主が遭遇しやすく、軽重を見誤ってはいけない病気です。ラベルに確認状況と受診の目安を示します。',
    systemTitle: '体の系統から見る',
    systemLead: '獣医学の手引きに近い分類です。まだ書いていない系統は短い案内だけです。',
    systems: systemMap('ja'),
    guideTitle: 'はじめて猫を飼う人へ',
    guideLead:
      '猫と暮らしたことがない人は、ここから読んでください。各ページは引用した指針と照合済みです。獣医師はまだ確認しておらず、受診の代わりにはなりません。',
    guidePages: {
      'before-arrival': '猫を迎える前に',
      'first-weeks': '最初の数日と数週間',
      'vaccines-and-parasites': 'ワクチン、寄生虫、最初の受診',
      neutering: '避妊・去勢',
      'food-and-body': '食事、水、体型',
      litter: 'トイレ',
      environment: '環境と行動のニーズ',
      'pain-and-illness': '痛みと病気に気づく',
      'choosing-a-vet': '動物病院の選び方',
      'life-stages': 'ライフステージと定期検診',
    },
    footerDisclaimer: '獣医師の診察の代わりにはなりません。処方の用量は書きません。',
    footerLicense: '内容は CC BY-SA 4.0、コードは MIT',
    footerContributing: '貢献のしかた',
    footerReviewers: '確認する獣医師',
    footerAbout: 'このサイトについて',
  },
};

export function copyFor(bcp47: string | undefined): Copy {
  return ui[langOf(bcp47)];
}

export const systemOrder = [
  'oral',
  'urinary',
  'endocrine',
  'infectious',
  'cardiovascular',
  'respiratory',
  'skin',
  'eyes',
  'musculoskeletal',
  'toxicology',
] as const;

export const guideOrder = [
  'before-arrival',
  'first-weeks',
  'vaccines-and-parasites',
  'neutering',
  'food-and-body',
  'litter',
  'environment',
  'pain-and-illness',
  'choosing-a-vet',
  'life-stages',
] as const;

export const diseaseOrder = [
  'diseases/oral/fcgs',
  'diseases/infectious/fip',
  'diseases/urinary/ckd',
  'diseases/urinary/flutd',
  'diseases/endocrine/hyperthyroidism',
  'diseases/endocrine/diabetes',
  'diseases/respiratory/uri',
  'diseases/oral/tooth-resorption',
] as const;
