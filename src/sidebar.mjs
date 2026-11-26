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
  group('新手養貓指引', 'First-time cat owner guide', '新手养猫指南', 'はじめて猫を飼う人へ', [
    link('簡介', 'About this guide', '简介', 'この案内', 'guide'),
    link('接貓回家之前', 'Before you bring a cat home', '接猫回家之前', '猫を迎える前に', 'guide/before-arrival'),
    link('最初幾天與幾週', 'The first days and weeks', '最初几天与几周', '最初の数日と数週間', 'guide/first-weeks'),
    link('疫苗、寄生蟲與第一次看診', 'Vaccination, parasites, and the first visit', '疫苗、寄生虫与第一次看诊', 'ワクチン、寄生虫、最初の受診', 'guide/vaccines-and-parasites'),
    link('絕育', 'Neutering', '绝育', '避妊・去勢', 'guide/neutering'),
    link('食物、飲水與體態', 'Food, water, and body condition', '食物、饮水和体态', '食事、水、体型', 'guide/food-and-body'),
    link('貓砂盆', 'Litter boxes', '猫砂盆', 'トイレ', 'guide/litter'),
    link('環境與行為需求', 'Environment and behavior', '环境与行为需求', '環境と行動のニーズ', 'guide/environment'),
    link('辨認疼痛與生病', 'Recognizing pain and illness', '辨认疼痛与生病', '痛みと病気に気づく', 'guide/pain-and-illness'),
    link('怎麼選獸醫', 'Choosing a vet', '怎么选兽医', '動物病院の選び方', 'guide/choosing-a-vet'),
    link('生命階段與定期檢查', 'Life stages and check-ups', '生命阶段与定期检查', 'ライフステージと定期検診', 'guide/life-stages'),
  ]),
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
