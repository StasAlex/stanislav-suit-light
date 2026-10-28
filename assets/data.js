window.STORE = {
  name: 'Stanislav',
  phone: '+380 67 367 28 16',
  phoneHref: 'tel:+380673672816',
  instagram: 'https://www.instagram.com/stanislav_suit/',
  address: 'Харків, вул. Суздальські ряди, 9',
  addressNote: 'Будинок торгівлі, нова будівля, ліве крило, 2 поверх',
  hours: [
    ['Пн', '9:00–15:00'],
    ['Вт–Сб', '9:00–17:00'],
    ['Нд', '9:00–16:00']
  ]
};

window.CATEGORIES = {
  suits: 'Костюми-трійки',
  tuxedo: 'Смокінги',
  trousers: 'Брюки',
  knit: 'Трикотаж',
  outer: 'Верхній одяг'
};

window.COLORS = {
  black: ['Чорний', '#0d0d0d'],
  brown: ['Коричневий', '#5a3626'],
  chocolate: ['Шоколад', '#3f2a20'],
  graphite: ['Графіт', '#3b3532'],
  taupe: ['Пудровий', '#8f7a72'],
  beige: ['Бежевий', '#c6b49a'],
  sand: ['Пісочний', '#d6c8a8'],
  navy: ['Темно-синій', '#1d2740'],
  royal: ['Синій', '#2a4f9e'],
  grey: ['Сірий', '#7b7b7b'],
  burgundy: ['Бордо', '#5e1c22']
};

(function () {
  const suitSizes = ['44', '46', '48', '50', '52', '54', '56', '58', '60'];
  const trouserSizes = ['46', '48', '50', '52', '54', '56', '58'];
  const knitSizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const heights = ['170–176', '176–182', '182–188', '188–194'];

  const suitText = 'Класична трійка: однобортний піджак на двох ґудзиках, жилет і брюки зі стрілками. Приталений силует, м’яке плече. Підходить на весілля, випускний і в офіс.';
  const suitCare = 'Тканина костюмна з вовною. Делікатна хімчистка, відпарювати через марлю. Зберігати на широких плічках.';
  const fit = 'Підшиття брюк і рукавів робимо в магазині, зазвичай за 15 хвилин. Якщо розмір не підійшов, обміняємо протягом 14 днів.';

  const P = [
    { id: 'suit-brown', cat: 'suits', name: 'Костюм-трійка коричневий', color: 'brown', price: 8900, isNew: false, imgs: 2, group: 'suits', text: suitText, care: suitCare },
    { id: 'suit-chocolate', cat: 'suits', name: 'Костюм-трійка шоколадний', color: 'chocolate', price: 9200, isNew: true, imgs: 2, group: 'suits', text: suitText, care: suitCare },
    { id: 'suit-graphite', cat: 'suits', name: 'Костюм-трійка графітовий меланж', color: 'graphite', price: 9200, isNew: true, imgs: 2, group: 'suits', text: suitText, care: suitCare },
    { id: 'suit-beige', cat: 'suits', name: 'Костюм-трійка бежевий', color: 'beige', price: 8400, isNew: true, imgs: 2, group: 'suits', text: suitText + ' Світлий відтінок добре виглядає на літньому весіллі.', care: suitCare },
    { id: 'suit-taupe', cat: 'suits', name: 'Костюм-трійка пудровий', color: 'taupe', price: 8900, isNew: false, imgs: 2, group: 'suits', text: suitText, care: suitCare },
    { id: 'tuxedo-black', cat: 'tuxedo', name: 'Смокінг-трійка чорний', color: 'black', price: 11800, isNew: true, imgs: 2, group: 'tuxedo', text: 'Смокінг із сатиновими лацканами, жилетом і брюками з лампасом. Для весілля, вечірнього прийому або випускного. Метелик підберемо в магазині.', care: suitCare },
    { id: 'trousers-navy', cat: 'trousers', name: 'Брюки класичні темно-сині', color: 'navy', price: 2300, isNew: true, imgs: 1, group: 'trousers', text: 'Класичні брюки прямого крою з посадкою на талії. Носяться з піджаком, джемпером або сорочкою.', care: 'Прати при 30°, прасувати через тканину.' },
    { id: 'trousers-brown', cat: 'trousers', name: 'Брюки класичні коричневі', color: 'brown', price: 2300, isNew: true, imgs: 1, group: 'trousers', text: 'Класичні брюки прямого крою з посадкою на талії. Носяться з піджаком, джемпером або сорочкою.', care: 'Прати при 30°, прасувати через тканину.' },
    { id: 'trousers-black', cat: 'trousers', name: 'Брюки класичні чорні', color: 'black', price: 2300, isNew: true, imgs: 1, group: 'trousers', text: 'Класичні брюки прямого крою з посадкою на талії. Носяться з піджаком, джемпером або сорочкою.', care: 'Прати при 30°, прасувати через тканину.' },
    { id: 'polo-royal', cat: 'knit', name: 'Джемпер-поло на блискавці синій', color: 'royal', price: 1750, isNew: true, imgs: 1, group: 'polo' },
    { id: 'polo-navy', cat: 'knit', name: 'Джемпер-поло на блискавці темно-синій', color: 'navy', price: 1750, isNew: true, imgs: 1, group: 'polo' },
    { id: 'polo-sand', cat: 'knit', name: 'Джемпер-поло на блискавці пісочний', color: 'sand', price: 1750, isNew: true, imgs: 1, group: 'polo' },
    { id: 'polo-grey', cat: 'knit', name: 'Джемпер-поло на блискавці сірий', color: 'grey', price: 1750, isNew: true, imgs: 1, group: 'polo' },
    { id: 'polo-burgundy', cat: 'knit', name: 'Джемпер-поло на блискавці бордо', color: 'burgundy', price: 1750, isNew: true, imgs: 1, group: 'polo' },
    { id: 'polo-brown', cat: 'knit', name: 'Джемпер-поло на блискавці коричневий', color: 'brown', price: 1750, isNew: true, imgs: 1, group: 'polo' },
    { id: 'bomber-black', cat: 'outer', name: 'Бомбер чорний', color: 'black', price: 3600, isNew: true, imgs: 2, group: 'bomber', text: 'Бомбер на блискавці з трикотажними манжетами. Легкий, під піджак не потрібен: носиться з брюками і поло.', care: 'Делікатне прання при 30°.' }
  ];

  const singleShot = ['tuxedo-black', 'bomber-black'];

  P.forEach(p => {
    if (singleShot.includes(p.id)) p.imgs = 1.5;
    if (p.cat === 'suits' || p.cat === 'tuxedo') { p.sizes = suitSizes; p.heights = heights; }
    else if (p.cat === 'trousers') p.sizes = trouserSizes;
    else p.sizes = knitSizes;
    if (p.group === 'polo') {
      p.text = 'Тонкий трикотажний джемпер з коміром-поло і короткою блискавкою. Носиться під піджак замість сорочки або окремо з брюками.';
      p.care = 'Ручне або делікатне прання при 30°, сушити горизонтально.';
    }
    p.fit = fit;
    if (p.imgs === 1.5) {
      p.images = [`img/${p.id}-1.webp`];
      p.thumbs = [`img/${p.id}-1-s.webp`];
      return;
    }
    p.images = p.imgs === 2 ? [`img/${p.id}-1.webp`, `img/${p.id}-2.webp`] : [`img/${p.id}.webp`];
    p.thumbs = p.imgs === 2 ? [`img/${p.id}-1-s.webp`, `img/${p.id}-2-s.webp`] : [`img/${p.id}-s.webp`];
  });

  window.PRODUCTS = P;
})();
