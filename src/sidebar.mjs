const item = (label, en, zhCN, ja, extra = {}) => ({
  label,
  translations: { en, 'zh-CN': zhCN, ja },
  ...extra,
});

const link = (label, en, zhCN, ja, slug) => item(label, en, zhCN, ja, { slug });

const group = (label, en, zhCN, ja, items, collapsed = false) =>
  item(label, en, zhCN, ja, { collapsed, items });

export const sidebar = [
  link('立刻就醫', 'See a vet now', '立刻就医', '直ちに受診', 'urgent'),
  link('症狀索引', 'Symptom index', '症状索引', '症状から探す', 'symptoms'),
  group('消化與口腔', 'Digestive and oral', '消化与口腔', '消化器・口腔', [
    link('簡介', 'About this group', '简介', 'この分類', 'diseases/oral'),
    link('慢性齦口炎', 'Chronic gingivostomatitis', '慢性龈口炎', '慢性歯肉口内炎', 'diseases/oral/fcgs'),
    link('牙吸收', 'Tooth resorption', '牙吸收', '歯の吸収', 'diseases/oral/tooth-resorption'),
  ]),
  group('泌尿', 'Urinary', '泌尿', '泌尿器', [
    link('簡介', 'About this group', '简介', 'この分類', 'diseases/urinary'),
    link('慢性腎病', 'Chronic kidney disease', '慢性肾病', '慢性腎臓病', 'diseases/urinary/ckd'),
    link(
      '下泌尿道疾病與尿道阻塞',
      'FLUTD and urethral obstruction',
      '下泌尿道疾病与尿道阻塞',
      '下部尿路疾患と尿道閉塞',
      'diseases/urinary/flutd',
    ),
  ]),
  group('內分泌', 'Endocrine', '内分泌', '内分泌', [
    link('簡介', 'About this group', '简介', 'この分類', 'diseases/endocrine'),
    link(
      '甲狀腺機能亢進',
      'Hyperthyroidism',
      '甲状腺功能亢进',
      '甲状腺機能亢進症',
      'diseases/endocrine/hyperthyroidism',
    ),
    link('糖尿病', 'Diabetes mellitus', '糖尿病', '糖尿病', 'diseases/endocrine/diabetes'),
  ]),
  group('感染', 'Infectious disease', '感染', '感染症', [
    link('簡介', 'About this group', '简介', 'この分類', 'diseases/infectious'),
    link(
      '貓傳染性腹膜炎',
      'Feline infectious peritonitis',
      '猫传染性腹膜炎',
      '猫伝染性腹膜炎',
      'diseases/infectious/fip',
    ),
  ]),
  group(
    '心血管',
    'Cardiovascular',
    '心血管',
    '循環器',
    [link('簡介', 'About this group', '简介', 'この分類', 'diseases/cardiovascular')],
    true,
  ),
  group('呼吸', 'Respiratory', '呼吸', '呼吸器', [
    link('簡介', 'About this group', '简介', 'この分類', 'diseases/respiratory'),
    link(
      '上呼吸道感染',
      'Upper respiratory infection',
      '上呼吸道感染',
      '上部気道感染症',
      'diseases/respiratory/uri',
    ),
  ]),
  group(
    '皮膚',
    'Skin',
    '皮肤',
    '皮膚',
    [link('簡介', 'About this group', '简介', 'この分類', 'diseases/skin')],
    true,
  ),
  group('眼', 'Eyes', '眼', '眼', [link('簡介', 'About this group', '简介', 'この分類', 'diseases/eyes')], true),
  group(
    '肌肉骨骼',
    'Musculoskeletal',
    '骨骼肌肉',
    '筋骨格',
    [link('簡介', 'About this group', '简介', 'この分類', 'diseases/musculoskeletal')],
    true,
  ),
  group(
    '中毒與急症',
    'Toxicology and emergency',
    '中毒与急症',
    '中毒・救急',
    [link('簡介', 'About this group', '简介', 'この分類', 'diseases/toxicology')],
    true,
  ),
  link('關於本站', 'About', '关于本站', 'このサイトについて', 'about'),
];
