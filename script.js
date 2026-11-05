(function () {
  var TG = 'https://t.me/azamat_badzoev';
  var motion = document.documentElement.classList.contains('motion');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b === undefined ? 1 : b, Math.max(a === undefined ? 0 : a, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var ease = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var mobileQuery = matchMedia('(max-width: 760px), (max-height: 500px) and (max-width: 1000px)');
  var isMobile = function () { return mobileQuery.matches; };
  var heroStacked = matchMedia('(max-width: 760px), (max-height: 500px) and (max-width: 1000px), (max-width: 1024px) and (orientation: portrait)');

  /* ---------- Прелоадер: буквы печатаются из размытия ---------- */
  var loader = $('#loader');
  if (motion && loader) {
    var typed = 0;
    $$('[data-type]', loader).forEach(function (el) {
      var text = el.textContent;
      el.textContent = '';
      text.split('').forEach(function (ch) {
        var s = document.createElement('span');
        s.textContent = ch;
        s.style.animationDelay = typed++ * .055 + 's';
        el.appendChild(s);
      });
      el.classList.add('is-typed');
    });
    var loaderStart = Date.now();
    var finishLoader = function () {
      setTimeout(function () {
        document.documentElement.classList.remove('is-loading');
        loader.classList.add('is-done');
        setTimeout(function () { loader.remove(); }, 500);
      }, Math.max(0, 1800 - (Date.now() - loaderStart)));
    };
    // не ждём медленную загрузку дольше 3 секунд
    var loaderTimer = setTimeout(finishLoader, 3000);
    if (document.readyState === 'complete') { clearTimeout(loaderTimer); finishLoader(); }
    else window.addEventListener('load', function () { clearTimeout(loaderTimer); finishLoader(); });
  } else if (loader) {
    loader.remove();
  }

  /* ---------- Данные: тексты со страниц 03–09 в Figma ---------- */
  var SERVICES = {
    consult: {
      chip: 'Продажи · лично Азамат', title: 'Стратегическая сессия по продажам, маркетингу и бизнесу',
      lead: 'Для вопроса, которому нужен подробный разбор. Азамат заранее изучает ваши материалы, за час вы вместе собираете план действий, после встречи вы получаете письменные выводы.',
      price: '', term: '60 минут онлайн', cta: 'Записаться на сессию',
      sections: [
        ['Кому подходит', ['Собственнику, который хочет разобраться в конкретном вопросе', 'Руководителю, которому нужен взгляд опытного практика со стороны', 'Тем, кто выбирает, с чего начать: продажи, маркетинг или сайт']],
        ['С чем приходят', ['Почему заявки есть, а продаж мало?', 'Как выстроить мотивацию менеджеров?', 'Нужен ли нам РОП и как его искать?', 'Какие показатели смотреть в CRM?', 'Приводит ли маркетинг нужных клиентов?', 'С чего начать перестройку отдела?']],
        ['Как проходит', ['Вы присылаете материалы: показатели, отчёты, скрипты, сайт', 'Азамат изучает их заранее — встреча начинается сразу с сути', 'Встреча до 60 минут онлайн, лично с Азаматом', 'После встречи — персональный письменный чек-лист']]
      ]
    },
    audit: {
      chip: 'Продажи · лично Азамат', title: 'Найдём, где отдел теряет сделки, и составим план исправлений',
      lead: 'Проверяем воронку, CRM и реальные разговоры с клиентами, документы и мотивацию, проводим интервью с командой. Итог — письменный разбор потерь и план изменений по приоритетам.',
      price: '', term: '7 рабочих дней после получения материалов', cta: 'Обсудить аудит в Telegram',
      sections: [
        ['Когда пора делать аудит', ['Заявок достаточно, а сделок мало', 'Результат зависит от конкретного менеджера', 'Непонятно, на каком этапе теряются сделки', 'CRM заполняется формально или не заполняется', 'Мотивация не связана с результатом']],
        ['Состав аудита', ['Воронка и CRM: одна воронка за последние два месяца, показатели и правила работы', 'Звонки и переписки: до 30 звонков и 10 переписок с клиентами', 'Документы: скрипты, КП, регламенты, планы и мотивация', 'Интервью с собственником, РОПом и одним сотрудником', 'Охват: РОП и до трёх менеджеров. Для большего отдела объём согласуем заранее', 'Итоговая встреча до 90 минут онлайн лично с Азаматом']],
        ['Оплачивается отдельно', ['Внедрение изменений', 'Обучение команды', 'Найм сотрудников', 'Настройка CRM']]
      ]
    },
    training: {
      chip: 'Продажи · Азамат и команда', title: 'Обучим команду увереннее доводить разговор до сделки',
      lead: 'Возьмём ваши реальные звонки и переписки, отработаем все этапы. РОП узнает, как лучше управлять отделом, обучать сотрудников и достигать 100% результативности.',
      price: '', term: 'Онлайн', cta: 'Обсудить тренинг',
      sections: [
        ['Что будет на тренинге', ['Разбор ваших реальных звонков и переписок', 'Отработка всех этапов разговора с клиентом', 'Отдельная работа с РОПом: управление отделом и обучение сотрудников']]
      ]
    },
    turnkey: {
      chip: 'Продажи · Азамат и команда', title: 'Построим новый отдел продаж или перестроим действующий',
      lead: 'Под руководством Азамата отдельная команда проектирует систему, настраивает CRM, создаёт скрипты, мотивацию и KPI, нанимает РОПа и до трёх менеджеров, обучает и передаёт отдел.',
      price: '', term: '3 + 1 месяц', cta: 'Обсудить построение отдела',
      sections: [
        ['Кому подходит', ['Нужен работающий отдел продаж, а не методичка', 'Нет времени и людей строить отдел своими силами', 'Нужно перестроить отдел, который перестал давать результат']],
        ['Пять этапов', ['Диагностика: продукт, клиенты и текущие продажи', 'Проектирование: структура, регламенты, инструкции, мотивация и KPI', 'CRM и скрипты: настраиваем воронку и пишем скрипты', 'Найм: РОП и до трёх менеджеров, платное размещение вакансий включено', 'Обучение и передача системы']],
        ['Кто работает над проектом', ['HR-специалист: найм РОПа и менеджеров', 'Разработчик продающих скриптов', 'Специалист по регламентам', 'CRM-специалист', 'Руководит лично Азамат']],
        ['Сроки и гарантия', ['3 месяца — ориентир до полной сдачи. Срок найма зависит от рынка кандидатов и вашего участия', '+1 месяц сопровождения: анализ звонков и корректировки', 'При необходимости в течение месяца сопровождения заменим нанятого менеджера']],
        ['Оплачивается отдельно', ['Лицензии CRM', 'Оформление и оплата сотрудников', 'Работы сверх согласованного состава']]
      ]
    },
    siteaudit: {
      chip: 'Сайты · студия ENCASE', title: 'Покажем, где сайт мешает клиенту оставить заявку',
      lead: 'Специалисты Encase проверяют сайт глазами клиента и готовят письменный разбор со скриншотами и приоритетными рекомендациями. Затем — онлайн-встреча до часа.',
      price: 'Бесплатно', term: '2 рабочих дня', cta: 'Заполнить заявку на аудит',
      sections: [
        ['Когда стоит проверить сайт', ['Трафик есть, а заявок мало', 'Посетители не понимают, что вы предлагаете', 'Сайт неудобен на телефоне', 'Планируете редизайн и хотите понять, что менять']],
        ['Шесть зон проверки', ['Первый экран: сразу ли понятно, что вы предлагаете и кому', 'Структура и путь: как посетитель доходит до заявки и где теряется', 'Тексты и предложение: ясность, конкретика, польза для клиента', 'Доверие: кейсы, отзывы, факты о компании', 'Формы и призывы: насколько легко оставить заявку', 'Мобильная версия: удобство на телефоне']],
        ['Что вы получите', ['Информативный PDF со скриншотами и пометками', 'Приоритетные рекомендации', 'Онлайн-встреча до часа для разбора', 'Новые дизайн-макеты по умолчанию не входят']]
      ]
    },
    sites: {
      chip: 'Сайты · студия ENCASE', title: 'Сайты, которые помогают бизнесу продавать',
      lead: 'Encase — дизайн-студия, основанная Азаматом. Полный цикл: аналитика, позиционирование, структура, тексты, дизайн, разработка, интеграции, тестирование и запуск.',
      price: '', term: '6-8 недель', cta: 'Оставить заявку',
      note: 'Не уверены, что менять? Начните с бесплатного аудита: за 2 рабочих дня покажем, где сайт мешает оставить заявку.',
      sections: [
        ['С чем приходят', ['Нужен новый сайт: запускаете продукт или направление', 'Сайт устарел и неудобен на телефоне', 'Заявок мало: трафик есть, а посетители уходят']],
        ['Полный цикл', ['Аналитика и позиционирование', 'Структура и тексты', 'Дизайн и разработка', 'Тестирование и запуск']],
        ['Опыт студии', ['7 лет в цифровых продуктах — опыт команды Encase', '30+ проектов реализовала команда Encase']]
      ]
    }
  };

  // Кейсы по макету 152:789: задача, решение и результат. Остальные (more) - в окне «Все кейсы», макет 198:2339
  var CASES = [
    { t: 'sales', name: 'Ameli Soul', logo: 'ameli-soul.png', period: 'Период результата: 3 месяца',
      steps: [['Проблема', 'Собственник не видел реальную картину в продажах', 'Команда работала без прозрачного контроля, и бизнес терял деньги.'],
        ['Задача', 'Вернуть контроль и собрать сильную команду', 'Чтобы отдел работал в интересах бизнеса - без агрессивного давления на клиентов.'],
        ['Решение', 'Показали факты и обновили команду', 'Проверили работу отдела, заменили руководителя, постепенно обновили команду, настроили контроль и внедрили мягкие техники SPIN.']],
      v: '+125% к прибыли ОП', text: 'За 3 месяца по сравнению с предыдущим кварталом.' },
    { t: 'sales', name: 'Трансформатор', logo: 'transformator.png', period: 'Длительность проекта: 3 месяца',
      steps: [['Проблема', 'Отдел не использовал потенциал входящих заявок', 'Текущая команда и процессы ограничивали рост продаж.'],
        ['Задача', 'Поднять конверсию и месячные продажи', 'Выстроить работу отдела почти с нуля.'],
        ['Решение', 'Собрали две команды продаж', 'Наняли шесть менеджеров и двух РОПов, подготовили скрипты и регламенты, обучили сотрудников и контролировали внедрение.']],
      v: '18 → 38+ млн/ месяц', text: 'Конверсия из лида в сделку выросла с 21% до 34% за 2 месяца. Валовая прибыль отдела к третьему месяцу выросла на 27% к периоду до изменений.' },
    { t: 'sites', name: 'Blockchain Sports', logo: 'blockchain-sports.png', period: 'Период измерения результата: январь - июнь 2025 года',
      steps: [['Проблема', 'Посетители не доходили до заявки', 'Путь от знакомства с проектом до обращения был сложным.'],
        ['Задача', 'Упростить путь пользователя', 'Увеличить долю обращений с сайта.'],
        ['Решение', 'Разработали UX/UI-дизайн сайта', 'Создали визуальную концепцию и графику.']],
      v: '23,3% → 39%', text: 'Конверсия посетителя в заявку по данным аналитики за январь - июнь 2025 года.' },
    { more: true, t: 'sales', name: 'Smarent', logo: 'smarent.svg', period: 'Период результата: 2 месяца',
      steps: [['Проблема', 'Менеджеры продавали только «лёгким» лидам', 'Заявок много, но сотрудники выбирали самых простых клиентов и не боролись за остальных.'],
        ['Задача', 'Довести до продажи больше заявок', 'Выстроить контроль каждого лида и сменить мотивацию.'],
        ['Решение', 'Ввели учёт и контроль каждого лида', 'Отслеживали движение по воронке, переработали скрипты, связали маркетинг и продажи, усилили команду.']],
      v: '34% → 42%', text: 'Конверсия из лида в сделку за 2 месяца.' },
    { more: true, t: 'sales', name: 'AVG Motors', logo: 'avg-motors.png', period: 'Период до устойчивого результата: 3 месяца',
      steps: [['Проблема', 'Команда и процессы не давали нужного результата', 'Состав команды, техники продаж, регламенты и мотивация не помогали отделу.'],
        ['Задача', 'Сделать рост прибыли постоянным', 'Перестроить отдел продаж так, чтобы компания стабильно развивалась.'],
        ['Решение', 'Обновили команду, регламенты и мотивацию', 'Изменили подход к продажам, прописали регламенты под нишу и полностью переработали мотивацию.']],
      v: '+6 млн ₽ к месячной прибыли', text: 'По сравнению с уровнем до проекта, на этот уровень вышли через 3 месяца. Это прирост месячной прибыли, а не сумма за 3 месяца.' },
    { more: true, t: 'sales', name: 'Нейрософия', logo: 'logo-neurosophia.png', period: 'Период результата: 2 месяца',
      steps: [['Проблема', 'Лидов хватало, но до оплаты доходили не все', 'Менеджеры неправильно применяли техники продаж.'],
        ['Задача', 'Поднять конверсию без роста рекламного бюджета', 'Больше оплат из тех же заявок, а не за счёт нового потока лидов.'],
        ['Решение', 'Внедрили новые техники через тренировки', 'Обучили менеджеров и проконтролировали применение подходов в реальных разговорах.']],
      v: '21% → 35%', text: 'Конверсия из заявки в оплату выросла на 14%' },
    { more: true, t: 'sites', name: 'Liquid Mining', logo: 'liquid-mining.svg', period: 'Период измерения результата: 2025 год',
      steps: [['Проблема', 'Путь к обращению был непонятным', 'Пользователям было сложно перейти от знакомства с продуктом к заявке.'],
        ['Задача', 'Улучшить ключевые сценарии', 'На сайте, в приложении и в криптокошельке.'],
        ['Решение', 'Обновили UX/UI и сценарии взаимодействия', 'Переработали интерфейс трёх продуктов экосистемы.']],
      v: '+63% к конверсии в заявку', text: 'По данным отдела маркетинга за 2025 год.' },
    { more: true, t: 'sales', name: 'Migliori', logo: 'logo-migliori.svg', period: 'Период результата: 2 месяца',
      steps: [['Проблема', 'Оплатой завершались только 7% заявок', 'Компания теряла продажи на этапе общения с клиентом.'],
        ['Задача', 'Довести конверсию в оплату до 10%', ''],
        ['Решение', 'Изменили скрипты и обучили менеджеров', 'Разобрали звонки и научили команду применять новые техники.']],
      v: 'Рост конверсии 7% → 10% за 2 месяца', text: '9% в первый месяц и 10% во второй. Цель компании достигнута.' },
    { more: true, t: 'sales', name: 'Тая Дейн', period: 'Период наблюдения: 6 месяцев от начала работы',
      steps: [['Проблема', 'Лидов много, продаж мало', 'Большинство лояльных клиентов не покупали продукты компании.'],
        ['Задача', 'Качественно обрабатывать каждый лид', 'Усилить команду и обучить её техникам продаж.'],
        ['Решение', 'Новые менеджеры, скрипты и обученный РОП', 'Наняли двух менеджеров, внедрили скрипты с упором на пользу для здоровья клиента, разбирали звонки, научили РОПа управлять командой.']],
      v: 'Выручка выросла в 3 раза за 6 месяцев', text: 'Через полгода от начала работы. Уже в первый месяц после проекта продажи выросли на 27%.' },
    { more: true, t: 'sales', name: 'ГК Black Star', logo: 'black-star.png', period: '',
      steps: [['Проблема', 'Командам не хватало единых навыков продаж', 'Сотрудникам разных направлений не хватало навыков работы с клиентами и управления продажами.'],
        ['Задача', 'Закрыть пробелы в навыках и поднять конверсию', 'Создать обучение для продающих отделов: концертного, одежды и франшизы.'],
        ['Решение', 'Разработали 26 учебных программ', 'Обучали в том числе концертных директоров и руководителей розницы.']],
      v: '+15% рост конверсии у продающих отделов', text: 'За год, по внутренней оценке и результатам тестов. Конверсия каждого продающего отдела выросла более чем на 15 процентных пунктов.' },
    { more: true, t: 'sales', name: 'Ivlev Agency', logo: 'logo-ivlev.png', period: 'Период результата: второй месяц работы отдела',
      steps: [['Проблема', 'Отдел продаж нужно было запустить с нуля', 'И быстро вывести новых менеджеров на план.'],
        ['Задача', 'Заложить основу регулярных продаж', 'Обучить первых сотрудников, описать ценность продукта и донести выгоды до менеджеров.'],
        ['Решение', 'Подготовили двух менеджеров', 'Взяли двух менеджеров, написали скрипты, обучили команду и ежедневно разбирали звонки.']],
      v: 'Выполнение плана в 2 млн ₽', text: 'Отдел из двух менеджеров выполнил план на второй месяц работы и выполнял его весь квартал.' },
    { more: true, t: 'sites', name: 'DDX Fitness', logo: 'ddx.svg', period: 'Период измерения результата: январь - июнь 2026 года',
      steps: [['Проблема', 'Пользователи не доходили до целевого действия', 'Часть посетителей не покупала абонемент и не записывалась на дополнительные занятия.'],
        ['Задача', 'Сделать целевые экраны понятнее', 'Увеличить число покупок и записей.'],
        ['Решение', 'Переработали UX/UI ключевых экранов', 'Привели пользовательские сценарии к единой визуальной логике.']],
      v: '×2 к конверсии целевых экранов', text: 'Конверсия в покупку абонемента или запись на дополнительное занятие, по данным компании за январь - июнь 2026 года.' },
    { more: true, t: 'sales', name: 'ArtDizo', logo: 'logo-artdizo.png', period: '',
      steps: [['Проблема', 'Не хватало сильных менеджеров и стандартов', 'Это ограничивало объём продаж.'],
        ['Задача', 'Усилить команду и увеличить выручку', 'Нанять новых менеджеров и выстроить единый подход к клиентам.'],
        ['Решение', 'Наняли трёх менеджеров и РОПа', 'Обучили команду, подготовили скрипты, внедрили разбор звонков.']],
      v: '+16% месячной выручки', text: 'По сравнению с месяцами до проекта.' },
    { more: true, t: 'sales', name: 'InBloom', logo: 'logo-inbloom.png', period: '',
      steps: [['Проблема', 'Менеджеры не справлялись с входящим спросом', 'Заявки не превращались в продажи в том объёме, на который рассчитывала компания.'],
        ['Задача', 'Увеличить месячную выручку', 'За счёт работы с заявками и, при необходимости, найма менеджеров.'],
        ['Решение', 'Наняли двух менеджеров и ввели разбор звонков', 'Внедрили скрипты и обучение. Роль РОПа выполнял собственник.']],
      v: '+32% месячной выручки', text: 'По сравнению с месяцами до проекта.' },
    { more: true, t: 'sales', name: 'Корни Иврита', logo: 'logo-korni.png', period: 'Период подтверждённого результата: не менее 6 месяцев',
      steps: [['Проблема', 'План держался на собственнике', 'Для выполнения плана требовалось его постоянное погружение в работу отдела.'],
        ['Задача', 'Разгрузить собственника', 'Создать команду и руководство, которые выполняют план самостоятельно.'],
        ['Решение', 'Вырастили РОПа внутри и наняли двух менеджеров', 'Повысили действующего сотрудника до руководителя, настроили планы и регулярное управление.']],
      v: 'План выполняется минимум полгода', text: 'Отдел работает без постоянного погружения собственника.' }
  ];

  /* ---------- Кейсы, фильтр и окно «Все кейсы» ---------- */
  var grid = $('#casesGrid'), casesMore = $('#casesMore'), caseFilter = 'all';
  var cModal = $('#casesModal'), cGrid = $('#casesModalGrid'), cFilter = 'all', cFrom;
  function esc(x) { var d = document.createElement('div'); d.textContent = x; return d.innerHTML; }
  // Логотип в плашке: тёмные логотипы - на светлой, у кого логотипа нет - название
  function logoChip(name, file) {
    if (!file) return '<span class="logo-chip logo-chip--word">' + esc(name) + '</span>';
    var light = /migliori|korni|artdizo/.test(file) ? ' logo-chip--light' : '';
    if (/ivlev|inbloom/.test(file)) light = ' logo-chip--tile';
    return '<span class="logo-chip' + light + '"><img src="' + file + '" alt="' + esc(name) + '"></span>';
  }
  function caseEl(c, i) {
    var el = document.createElement('article');
    el.className = 'case';
    el.style.setProperty('--d', (i % 3) * .06 + 's');
    var h = '<div class="case__top"><span class="case__logo-box">' + logoChip(c.name, c.logo) + '</span><span class="case__cat">' + (c.t === 'sites' ? 'Сайты ENCASE' : 'Продажи') + '</span></div>' +
      '<p class="case__name">' + esc(c.name) + '</p>' + (c.period ? '<p class="case__period">' + esc(c.period) + '</p>' : '');
    (c.steps || []).forEach(function (st) {
      h += '<div class="case__step"><p class="case__label">' + st[0] + '</p><p class="case__title">' + esc(st[1]) + '</p>' + (st[2] ? '<p class="case__text">' + esc(st[2]) + '</p>' : '') + '</div>';
    });
    h += '<div class="case__res"><p class="case__label">Результат</p><p class="case__v">' + esc(c.v) + '</p><p class="case__text">' + esc(c.text) + '</p></div>';
    el.innerHTML = h;
    return el;
  }
  function fill(box, list) {
    box.innerHTML = '';
    list.forEach(function (c, i) { box.appendChild(caseEl(c, i)); });
  }
  function byType(f) { return function (c) { return f === 'all' || c.t === f; }; }
  function renderCases() {
    var list = CASES.filter(byType(caseFilter));
    fill(grid, list.filter(function (c) { return !c.more; }));
    casesMore.hidden = !list.some(function (c) { return c.more; });
  }
  function renderModal() { fill(cGrid, CASES.filter(function (c) { return c.more; }).filter(byType(cFilter))); }
  function setFilter(attr, val) {
    $$('[' + attr + ']').forEach(function (x) { x.classList.toggle('is-on', x.getAttribute(attr) === val); });
  }
  function openCases() {
    cFrom = document.activeElement;
    cFilter = caseFilter;
    setFilter('data-mfilter', cFilter);
    renderModal();
    cModal.hidden = false;
    cModal.scrollTop = 0;
    document.body.classList.add('is-locked');
    requestAnimationFrame(function () { cModal.classList.add('is-open'); });
    $('#casesModalClose').focus();
  }
  function closeCases() {
    if (cModal.hidden) return false;
    cModal.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    setTimeout(function () { cModal.hidden = true; }, 300);
    if (cFrom) cFrom.focus();
    return true;
  }
  renderCases();
  casesMore.addEventListener('click', openCases);
  $('#casesModalClose').addEventListener('click', closeCases);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCases(); });
  $$('[data-filter]').forEach(function (b) {
    b.addEventListener('click', function () {
      caseFilter = b.dataset.filter;
      setFilter('data-filter', caseFilter);
      renderCases();
    });
  });
  $$('[data-mfilter]').forEach(function (b) {
    b.addEventListener('click', function () {
      cFilter = b.dataset.mfilter;
      setFilter('data-mfilter', cFilter);
      renderModal();
    });
  });

  /* ---------- Отзывы: «Все отзывы» раскрывает список вниз, «Свернуть» - обратно ---------- */
  var revGrid = $('#reviewsGrid'), revBtn = $('#reviewsAll');
  revBtn.addEventListener('click', function () {
    var top = revBtn.getBoundingClientRect().top;
    var open = revGrid.classList.toggle('is-all');
    revBtn.setAttribute('aria-expanded', open);
    revBtn.querySelector('.act__l').textContent = open ? 'Свернуть' : 'Все отзывы';
    // при сворачивании кнопка остаётся на том же месте экрана
    if (!open) window.scrollTo({ top: window.scrollY + revBtn.getBoundingClientRect().top - top, behavior: 'instant' });
  });

  /* ---------- Цифры: досчитываются, когда блок появляется на экране ---------- */
  var nums = $$('.fact__num');
  if (motion && 'IntersectionObserver' in window) {
    nums.forEach(function (n) { n.dataset.to = n.textContent; n.textContent = n.dataset.from || '0'; });
    var countIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        countIo.unobserve(en.target);
        var n = en.target, from = +(n.dataset.from || 0), to = +n.dataset.to, t0 = null;
        var delay = parseFloat(getComputedStyle(n.closest('.fact')).transitionDelay) * 1000 || 0;
        setTimeout(function () {
          requestAnimationFrame(function step(now) {
            if (t0 === null) t0 = now;
            var k = Math.min(1, (now - t0) / 1400);
            n.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
            if (k < 1) requestAnimationFrame(step);
          });
        }, delay);
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    nums.forEach(function (n) { countIo.observe(n); });
  }

  /* ---------- Фильтр услуг ---------- */
  $$('[data-sfilter]').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('[data-sfilter]').forEach(function (x) { x.classList.toggle('is-on', x === b); });
      $$('.product').forEach(function (p) { p.hidden = b.dataset.sfilter !== 'all' && p.dataset.cat !== b.dataset.sfilter; });
    });
  });

  /* ---------- Панель услуги ---------- */
  var drawer = $('#drawer');
  var drawerBody = $('#drawerBody');
  function serviceHtml(s, titleId) {
    var h = '<span class="chip d-chip">' + s.chip + '</span>' +
      '<h3 class="d-title" id="' + titleId + '">' + s.title + '</h3>' +
      '<p class="d-lead">' + s.lead + '</p>' +
      '<div class="d-price">' + (s.price ? '<b>' + s.price + '</b>' : '') + '<span>' + s.term + '</span></div>';
    if (s.note) h += '<div class="d-sec"><p>' + s.note + '</p></div>';
    s.sections.forEach(function (sec) {
      h += '<div class="d-sec"><h4>' + sec[0] + '</h4><ul>' +
        sec[1].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>';
    });
    h += '<a class="act d-cta" href="' + TG + '" target="_blank" rel="noopener"><span class="act__l">' + s.cta + '</span><span class="act__c"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" stroke-width="1.8" fill="none"/></svg></span></a>';
    return h;
  }
  function openService(id) {
    var s = SERVICES[id];
    if (!s) return;
    drawerBody.innerHTML = serviceHtml(s, 'drawerTitle');
    drawer.scrollTop = 0;
    drawer.showModal();
  }
  // Ссылки из меню открываются прямо в меню, на весь экран
  var menuSvc = $('#menuService'), menuSvcFrom;
  function openInMenu(id, from) {
    var s = SERVICES[id];
    if (!s) return;
    menuSvcFrom = from;
    $('#menuServiceBody').innerHTML = serviceHtml(s, 'menuServiceTitle');
    menuSvc.hidden = false;
    menuSvc.scrollTop = 0;
    requestAnimationFrame(function () { menuSvc.classList.add('is-open'); });
    $('#menuServiceClose').focus();
  }
  function closeInMenu() {
    if (menuSvc.hidden) return false;
    menuSvc.classList.remove('is-open');
    menuSvc.hidden = true;
    if (menuSvcFrom) menuSvcFrom.focus();
    return true;
  }
  $('#menuServiceClose').addEventListener('click', closeInMenu);
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-service]');
    if (!b) return;
    if (b.closest('#menu')) openInMenu(b.dataset.service, b);
    else openService(b.dataset.service);
  });
  $('#drawerClose').addEventListener('click', function () { drawer.close(); });
  drawer.addEventListener('click', function (e) { if (e.target === drawer) drawer.close(); });

  /* ---------- Меню ---------- */
  var menu = $('#menu');
  var lastFocus;
  function openMenu() {
    lastFocus = document.activeElement;
    menu.hidden = false;
    requestAnimationFrame(function () { menu.classList.add('is-open'); });
    document.body.classList.add('is-locked');
    $('#menuClose').focus();
  }
  function closeMenu() {
    if (menu.hidden) return;
    closeInMenu();
    menu.classList.remove('is-open');
    menu.hidden = true;
    document.body.classList.remove('is-locked');
    if (lastFocus) lastFocus.focus();
  }
  $$('[data-menu-open]').forEach(function (b) { b.addEventListener('click', openMenu); });
  $('#menuClose').addEventListener('click', closeMenu);
  $$('a', menu).forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !closeInMenu()) closeMenu(); });

  /* ---------- Разбивка текста ---------- */
  // Буквы: slideUp с задержкой 0.02–0.08с, как MONO
  function splitLetters(el, step) {
    var text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.textContent = '';
    var n = 0;
    text.split(' ').forEach(function (word, wi, all) {
      var w = document.createElement('span');
      w.className = 'ltr-word';
      w.setAttribute('aria-hidden', 'true');
      word.split('').forEach(function (ch) {
        var s = document.createElement('span');
        s.className = 'ltr';
        s.textContent = ch;
        s.style.setProperty('--d', (n++ * step) + 's');
        w.appendChild(s);
      });
      el.appendChild(w);
      if (wi < all.length - 1) el.appendChild(document.createTextNode(' '));
    });
  }
  $$('[data-letters]').forEach(function (el) { splitLetters(el, .012); });
  $$('[data-letters-view]').forEach(function (el) { splitLetters(el, .08); });

  // Слова: размытие снимается по мере скролла
  var blurBlocks = $$('[data-blur]').map(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.textContent = '';
    var spans = words.map(function (w) {
      var s = document.createElement('span');
      s.className = 'w';
      s.setAttribute('aria-hidden', 'true');
      s.textContent = w;
      el.appendChild(s);
      el.appendChild(document.createTextNode(' '));
      return s;
    });
    return { el: el, spans: spans };
  });

  /* ---------- Появление при скролле ---------- */
  var reveal = $$('.r-up, .r-left, .r-right, [data-letters-view]');
  reveal.forEach(function (el) {
    var p = el.parentElement;
    var i = Array.prototype.indexOf.call(p.children, el);
    if (!el.hasAttribute('data-letters-view')) el.style.setProperty('--d', Math.min(i, 5) * .08 + 's');
  });
  if ('IntersectionObserver' in window && motion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Анимации по скроллу ---------- */
  var pill = $('#pill');
  var heroTrack = $('.hero-track');
  var hero = {
    center: $('#heroCenter'), over: $('#heroOver'), row: $('#heroRow'), sides: $$('.hero-side')
  };
  var flipTrack = $('.flip-track'), flips = $$('.flip-item');
  var resTrack = $('.results-track');
  var res = {
    center: $('#resultsCenter'), sides: $$('.results-side'),
    layers: $$('[data-layer]'), phrases: $$('[data-phrase]')
  };
  var stackTrack = $('.stack-track'), cards = $$('.stack-card');
  var about = $('#about'), aboutV = -1;
  var finalCard = $('#finalCard'), finalWord = $('.final__word');

  function progress(track) {
    var r = track.getBoundingClientRect();
    return clamp(-r.top / Math.max(1, r.height - window.innerHeight));
  }

  function renderHero() {
    if (heroStacked.matches) {
      hero.sides.forEach(function (s) { s.removeAttribute('style'); });
      hero.center.removeAttribute('style');
      hero.over.style.opacity = '';
      return;
    }
    var p = progress(heroTrack);
    var e = ease(clamp(p / .82));
    hero.center.style.width = lerp(100, 33.4, e) + '%';
    hero.center.style.borderRadius = lerp(0, 12, e) + 'px';
    hero.row.style.gap = lerp(0, 6, e) + 'px';
    hero.sides.forEach(function (s) {
      var dir = Number(s.dataset.side);
      s.style.width = lerp(0, 33.3, e) + '%';
      s.style.opacity = clamp(e * 1.6);
      s.style.transform = 'translateX(' + dir * (1 - e) * 100 + '%) translateY(' + -clamp((p - .35) / .65) * 9 + '%)';
    });
    var o = 1 - clamp(p / .2);
    hero.over.style.opacity = o;
    hero.over.style.visibility = o <= 0 ? 'hidden' : '';
  }

  // На каждый шаг скролла цифра целиком переворачивается и встаёт ровно, анимация идёт по времени
  function renderFlip() {
    var idx = Math.min(flips.length - 1, Math.floor(progress(flipTrack) * flips.length));
    flips.forEach(function (f, i) {
      f.classList.toggle('is-past', i < idx);
      f.classList.toggle('is-cur', i === idx);
    });
  }

  function renderBlur() {
    var vh = window.innerHeight;
    blurBlocks.forEach(function (b) {
      var r = b.el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 1.5) return;
      var p = clamp((vh * .88 - r.top) / (r.height + vh * .3));
      var n = b.spans.length;
      b.spans.forEach(function (s, i) {
        var t = clamp(p * (n + 5) - i, 0, 5) / 5;
        s.style.opacity = t;
        s.style.filter = t >= 1 ? 'none' : 'blur(' + (1 - t) * 14 + 'px)';
      });
    });
  }

  function renderResults() {
    var p = progress(resTrack);
    var mobile = isMobile();
    if (!mobile) {
      var e = ease(clamp(p / .24));
      res.center.style.width = lerp(46, 100, e) + '%';
      res.center.style.borderRadius = lerp(16, 0, e) + 'px';
      res.sides.forEach(function (s) {
        var dir = Number(s.dataset.side);
        s.style.width = lerp(26, 0, e) + '%';
        s.style.opacity = 1 - e;
        s.style.transform = 'translateX(' + dir * e * 60 + '%)';
      });
    } else {
      res.center.removeAttribute('style');
    }
    // Три фазы цифр: смена через размытие 40px
    var q = (p - .2) / .8 * res.phrases.length;
    res.phrases.forEach(function (ph, i) {
      var l = q - i;
      // соседние фразы немного перекрываются, чтобы экран не оставался пустым
      var t = l < -.12 ? 0 : l < .12 ? (l + .12) / .24 : l < .88 ? 1 : l < 1.12 ? (1.12 - l) / .24 : 0;
      // первая фраза видна уже во время раскрытия картинки, последняя остаётся до конца
      if (i === 0 && l < .88) t = 1;
      if (i === res.phrases.length - 1 && l >= .88) t = 1;
      ph.style.opacity = t;
      ph.style.filter = t >= 1 ? 'none' : 'blur(' + (1 - t) * 40 + 'px)';
      ph.style.visibility = t <= 0 ? 'hidden' : '';
    });
    // Картинка меняется от дня к ночи
    res.layers.forEach(function (l, i) {
      l.style.opacity = i === 0 ? 1 : clamp(q - i + .35, 0, .7) / .7;
    });
  }

  // Карточки шагов догоняют скролл с плавным сглаживанием, а не прыгают за каждым шагом колеса
  var stackP = -1, stackTarget = 0, stackRaf = 0;
  cards.forEach(function (c, i) { c.style.zIndex = i; });
  function applyStack(p) {
    var n = cards.length;
    cards.forEach(function (c, i) {
      if (i === 0) return;
      var l = clamp(p * (n - 1) - (i - 1));
      c.style.visibility = l <= 0 ? 'hidden' : '';
      c.style.transform = l >= 1 ? 'none' : 'translate3d(0,' + ((1 - l) * 102).toFixed(2) + '%,0) scale(' + (.94 + .06 * l).toFixed(4) + ')';
    });
  }
  function stackTick() {
    stackRaf = 0;
    var d = stackTarget - stackP;
    if (Math.abs(d) < .0005) stackP = stackTarget;
    else { stackP += d * .16; stackRaf = requestAnimationFrame(stackTick); }
    applyStack(stackP);
  }
  function renderStack() {
    stackTarget = progress(stackTrack);
    if (stackP < 0) stackP = stackTarget;
    if (!stackRaf) stackRaf = requestAnimationFrame(stackTick);
  }

  function renderFinal() {
    // на телефоне слова нет, карточка стоит на месте
    // карточка стоит на месте и сразу заходит на низ надписи BADZOEV, как в макете 152:1039
    return;
  }

  // Блок «Обо мне»: весь экран плавно переходит из чёрного в белый, пока блок поднимается по скроллу
  function renderAbout() {
    var vh = window.innerHeight;
    var v = Math.round(ease(clamp((vh * .6 - about.getBoundingClientRect().top) / (vh * .5))) * 255);
    if (v === aboutV) return;
    aboutV = v;
    var bg = 'rgb(' + v + ',' + v + ',' + v + ')';
    var t = Math.round(lerp(255, 10, v / 255));
    about.style.backgroundColor = bg;
    about.style.color = 'rgb(' + t + ',' + t + ',' + t + ')';
    stackTrack.style.backgroundColor = bg;
  }

  // Шапка: прозрачная на первом экране, белая с кнопкой с начала второго блока
  function renderPill() {
    pill.classList.toggle('is-hero', heroTrack.getBoundingClientRect().bottom > window.innerHeight);
  }

  function near(el) {
    var r = el.getBoundingClientRect();
    return r.bottom > -200 && r.top < window.innerHeight + 200;
  }

  function render() {
    renderPill();
    if (!motion) return;
    // считаем только то, что рядом с экраном: иначе первый экран и результаты перестраивают страницу на каждый кадр
    if (near(heroTrack)) renderHero();
    renderBlur();
    var stackNear = near(stackTrack);
    pill.classList.toggle('no-blur', stackNear);
    if (stackNear) renderStack();
    renderAbout();
    renderFinal();
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; render(); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  render();
})();
