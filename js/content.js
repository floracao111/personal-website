/* ==========================================================================
   CONTENT — the only file you need to edit to update the site.

   MEDIA ITEMS
   Anywhere you see a media object, it accepts:
     src      'assets/projects/<slug>/cover.mp4'   (video: .mp4 .webm .mov)
              'assets/projects/<slug>/cover.gif'   (gif / jpg / png / webp)
              ['…/cover.webm', '…/cover.mp4']      (multiple video sources)
     poster   optional still image shown while a video loads
     alt      short description (also used as the placeholder label)
     caption  optional caption under the media (HTML allowed)
     ratio    optional, e.g. '16 / 9'. Leave out to use the file's own shape.
     position optional — which part stays in view when cropped: 'left', 'right', 'top', '30% 50%'
     audio    true → video gets controls and is NOT autoplayed/muted
   Leave src empty ('') and a labelled placeholder is shown instead.

   Videos autoplay, loop, and are muted. They pause when scrolled offscreen.
   ========================================================================== */

window.SITE = {
  name: 'Flora Cao',
  email: 'floracao.studio@gmail.com',

  // Portrait in the identity panel, drawn as colour-dot particles by js/pixel-portrait.js.
  // Swap the photo by replacing assets/portrait/photo.jpg (any size; ~1000px wide is plenty).
  // The colour-dot portrait is switched off. To bring it back: uncomment `dots` below and add
  //   <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.1/p5.min.js"></script>
  //   <script src="js/pixel-portrait.js"></script>
  // after js/site.js in index.html, project.html and about.html.
  portrait: {
    // dots: 'assets/portrait/photo.jpg',
    alt: 'Portrait of Flora working on an electronics project, made of colour dots',
  },

  // Shape of every cover on the homepage grid, e.g. '3 / 2', '16 / 10', '5 / 3' or '16 / 9'.
  coverRatio: '16 / 10',

  // Name drawn as an image at the top of the side panel (leave out to show the name as text).
  nameImage: 'assets/identity/name.png',

  // Short list under the name in the side panel — empty = none.
  focus: [],

  nav: [
    { id: 'about', label: 'About', href: 'about' },
  ],
};

/* --------------------------------------------------------------------------
   PROJECTS — order here = order on the homepage grid.

   blurb     the one-line description shown next to the title on the homepage
   cover     the moving image on the homepage tile (cropped to SITE.coverRatio)
   logo      optional image shown instead of the text title at the top of the project page
   logos     optional small partner/collaborator logos above the title: [{ src, alt, height }, …]
             (height in px is optional — use it to balance logos with lots of white space)
   logosOnCover  true → the logos also appear small in the top-right of the homepage cover
                 (a logo's coverHeight, in px, sets its size there)
   coverLogos    small logos for the homepage cover only (not shown on the project page): [{ src, alt, coverHeight }, …]
   hero      the large visual at the top of the project page (false = none).
             A list of media shows them side by side; add  heroRow: true  to line up mixed shapes at equal height.
             For a Vimeo/YouTube video use  hero: { embed: 'https://player.vimeo.com/video/…' }
             For PDF pages to flip through use  hero: { pages: ['…/page-01.jpg', …] }
             From a PDF:          osascript -l JavaScript scripts/pdf-pages.js file.pdf output-folder
             From page images:    zsh scripts/normalize-pages.sh image-folder output-folder
             (defaults to cover if left out)
   meta      any key/value pairs — shown as a small table. Add/remove freely.
   sections  as many or as few as the project needs. Each section can have:
               label    small italic label in the left column ('Process')
               heading  optional heading
               text     a string or an array of paragraphs (HTML allowed)
               media    array of media items
               columns  1, 2 or 3 — how the media is laid out (default 1)
                        'row' — side by side at equal height, nothing cropped
                        (give every item its true `ratio`, e.g. '1151 / 2400')
   -------------------------------------------------------------------------- */

window.PROJECTS = [
  {
    slug: 'cueddata',
    title: 'CuedData',
    logo: [
      { src: 'assets/projects/cueddata/web/cued.svg' },
      { src: 'assets/projects/cueddata/web/data.svg', scale: 52 / 53 }, // the two files are 53 and 52 px tall
    ],
    blurb: 'Robotic gestures synced with speech, generating AI training data',
    tags: ['Robotics', 'Automation', 'AI Database', 'Assistive Technology'],
    summary: 'An automated robotic system for generating standardized Cued Speech video data.',
    meta: {
      Timeline: 'Mar – July 2026',
      Role: 'Designer & Developer',
      Sponsor: 'Voibook',
      Patent: { text: 'This project led to a broader Cued Speech robotic system, for which we have a patent pending', labelColor: '#fd6e63' }, // Voibook's logo orange
    },
    status: 'Patent pending', // bubble on the homepage cover
    logosOnCover: true, // also show the logos, small, on the homepage cover
    logos: [
      { src: 'assets/projects/cueddata/web/voibook.png', alt: 'Voibook', height: 30, coverHeight: 20 },
      { src: 'assets/projects/cueddata/web/hkustgz.png', alt: 'HKUST (Guangzhou)', height: 50, coverHeight: 20 },
    ],
    cover: { src: 'assets/projects/cueddata/web/cover3.jpg' }, // pre-shrunk to 1200px so the tile stays sharp
    intro: {
      label: 'Background',
      text: [
        '<a href="https://www.voibook.com/" target="_blank" rel="noopener">Voibook</a> is a prominent hearing accessibility technology company in China. This year, one of its goals is to promote Cued Speech in China, to support literacy and speech rehabilitation for deaf people. <span class="aside">(Cued Speech has already demonstrated educational value internationally, but Mandarin Cued Speech is still in the early stages of adoption.)</span>',
        'After a chat with the founder, we started imagining how robotics could help address this challenge.',
        'I developed CuedData, a system that automates the generation of standardized Mandarin Cued Speech recordings for AI recognition training and future speech education.',
      ],
      noteLabel: 'With thanks',
      note: '<a href="https://www.wicinternet.org/2024-01/22/c_976313.htm" target="_blank" rel="noopener">Shi Chengchuan</a> has been a true inspiration to me and many others. I’m grateful for the conversations that sparked this project and the opportunity to support Voibook’s mission.',
    },
    // Portfolio pages — pages 2–7 of "Flora Cao Portfolio.pdf", made with: osascript -l JavaScript scripts/pdf-pages.js <pdf> <folder>
    hero: {
      alt: 'CuedData portfolio',
      star: '#fd6e63', // big star in Voibook's logo orange, before "Scroll to read about this project"
      ratio: '2000 / 1413',
      pages: [
        'assets/projects/cueddata/web/pages/page-01.jpg?v=3',
        'assets/projects/cueddata/web/pages/page-02.jpg?v=2',
        'assets/projects/cueddata/web/pages/page-03.jpg?v=2',
        'assets/projects/cueddata/web/pages/page-04.jpg?v=2',
        'assets/projects/cueddata/web/pages/page-05.jpg?v=2',
        'assets/projects/cueddata/web/pages/page-06.jpg?v=2',
      ],
    },
    sections: [
      {
        label: 'Interface',
        columns: 2,
        media: [
          { src: 'assets/projects/cueddata/web/production-page-demo.mp4?v=2', poster: 'assets/projects/cueddata/web/production-page-demo-poster.jpg?v=2', ratio: '16 / 9', caption: 'Production page demo' },
          { src: 'assets/projects/cueddata/web/data-page-demo.mp4?v=3', poster: 'assets/projects/cueddata/web/data-page-demo-poster.jpg?v=3', ratio: '16 / 9', caption: 'Data page demo' },
        ],
      },
      {
        columns: 'row',
        media: [
          { src: 'assets/projects/cueddata/web/production-page.png', ratio: '2400 / 1264', caption: 'Production page interface' },
          { src: 'assets/projects/cueddata/web/data-page.png', ratio: '2400 / 1345', caption: 'Data page interface' },
        ],
      },
      {
        label: 'Early Testing',
        columns: 2,
        media: [
          { src: 'assets/projects/cueddata/web/hand-position-testing.mp4', poster: 'assets/projects/cueddata/web/hand-position-testing-poster.jpg', ratio: '16 / 9', caption: 'Hand position' },
          { src: 'assets/projects/cueddata/web/handshape-handposition-testing.mp4', poster: 'assets/projects/cueddata/web/handshape-handposition-testing-poster.jpg', ratio: '16 / 9', caption: 'Handshape + hand position' },
        ],
      },
      {
        label: 'Robot hand',
        columns: 'row',
        media: [
          { src: 'assets/projects/cueddata/web/robothandprocess1.jpg', ratio: '3 / 4' },
          { src: 'assets/projects/cueddata/web/robothandprocess2.jpg', ratio: '3 / 4' },
          { src: 'assets/projects/cueddata/web/robothandsketch.png', ratio: '796 / 1016' },
        ],
      },
      {
        label: 'Data Production Setup',
        columns: 2,
        media: [
          { src: 'assets/projects/cueddata/web/img_3084.jpg', ratio: '3 / 2' },
          { src: 'assets/projects/cueddata/web/img_3078.jpg', ratio: '3 / 2' },
        ],
      },
    ],
  },
  {
    slug: 'cuedkit',
    title: 'CuedKit',
    blurb: 'An easy, open-source robotic hand kit for education and research',
    tags: ['Robotics', 'Education', 'Open Source', 'Assistive Technology'],
    summary:
      'CuedKit is a low-cost robotic hand and arm kit that performs Mandarin Cued Speech. </br> </br> Anyone can order a kit from me, available at the cost of materials. It includes the printed hand and arm, the electronics and the face sheet, plus video assembly guides. </br> </br> Later, the user can also follow the course to play and learn.',
    meta: {
      Timeline: 'Aug – Oct 2026',
      Role: 'Designer & Developer',
      Position: 'Research Assistant to Prof. Li Liu at HKUST GZ',
    },
    logo: 'assets/projects/cuedkit/web/cuedkit-logo.svg',
    logosOnCover: true, // also show the logo, small, on the homepage cover
    coverLogosPanel: true, // the Blender cover is dark, so the logo sits on the same frosted backing as the status labels
    logos: [{ src: 'assets/projects/cueddata/web/hkustgz.png', alt: 'HKUST (Guangzhou)', height: 50, coverHeight: 20 }], // beside the title, same size as on CuedData's
    cover: { src: 'assets/projects/cuedkit/web/cover-blender.mp4', poster: 'assets/projects/cuedkit/web/cover-blender-poster.jpg' },
    heroRow: true, // side by side at the same height
    hero: [
      { src: 'assets/projects/cuedkit/web/concept-2.jpg', ratio: '1580 / 1162', alt: 'Concept: a child learning Cued Speech with CuedKit and a laptop' },
      { src: 'assets/projects/cuedkit/web/finished-hand.jpg', ratio: '4 / 3', alt: 'The finished CuedKit hand and arm' },
    ],
    sections: [
      {
        title: 'Origin',
        text: [
          'While building <a href="cueddata">CuedData</a>, I needed a robotic hand. There were no open-source robotic hands that were easy to print or assemble, so I bought a prefabricated one online. It was not cheap, and it still was not dexterous enough to perform one of the handshapes (a peace sign). The more dexterous options were significantly more expensive.',
          'So I decided to build my own: simple to assemble, and just dexterous enough for Cued Speech. I designed it as an open-source kit available at cost, so others would not run into the same problem.',
        ],
      },
      {
        heading: 'Why a physical robot?',
        text: [
          'Physical teaching aids remain useful because they can be observed, manipulated, and revisited in real space. A robotic hand can sit on a desk, hold a Cued Speech shape, and be interacted with directly.',
          'Working with the Mandarin Cued Speech team at HKUST GZ, I understood they travel to special schools to teach students face-to-face rather than relying on video lessons.',
        ],
        stat: {
          value: '73%',
          text: 'of significant results favored physically present robots over virtual agents shown on a screen.',
          source: 'Li, International Journal of Human-Computer Studies, 2015',
        },
        statAfter: true, // the figure comes after the paragraphs
        // a small video nested beside this section's narrowed text, exactly as tall as it
        beside: { src: 'assets/projects/cuedkit/web/current.mp4', poster: 'assets/projects/cuedkit/web/current-poster.jpg', ratio: '9 / 16', alt: 'CuedKit cueing', short: true, tall: true, textWidth: '74%' },
      },
      {
        heading: 'Who’s it for?',
        text: [
          'Learners, educators and researchers.',
          'Today, learning often depends on specialized teachers and in-person instruction. CuedKit adds a reusable physical resource that can be used beyond the classroom.',
        ],
      },
      {
        heading: 'Where CuedKit sits',
        // one sentence per line, then the takeaway as its own paragraph, all before the table
        text: [
          'Yale OpenHand proved open-source hands can be research-level.<br>e-NABLE proved open-source 3D prints can reach real users in need.<br>Makeblock proved kits can be fun and educational.<br>Robotics labs proved robotic hands can demonstrate sign language.',
          'CuedKit brings them together in a low-cost, open-source robotic hand for Cued Speech and potentially other visual communication methods.',
        ],
        table: {
          columns: ['Open Source', 'Low Cost', 'Sign Language /<br>Cued Speech', 'Assemblable'],
          rows: [
            ['Yale OpenHand', true, false, false, true],
            ['e-NABLE', true, true, false, true],
            ['Makeblock', false, true, false, true],
            ['Robotics labs', false, false, true, false],
            ['CuedKit', true, true, true, true],
          ],
          highlight: 'CuedKit',
          tone: 'pink',
        },
      },
      {
        heading: 'Design question',
        text: '<span class="pink big">How do I make an affordable & educational robot hand easily available for people?</span>',
      },
      {
        heading: 'Design principles',
        text: [
          '<b>Affordable</b><br>Available at cost, with no profit.<br>Print-in-place, fewer parts.<br>Factory-free production.',
          '<b>Educational</b><br>Learn through movements.<br>Structured lessons and quizzes.<br>Easy practice by typing and seeing every syllable cued.',
        ],
        textPair: true,
      },
      {
        title: 'Robotic hand iterations',
        text: [
          'My goal was to print as many parts in place as possible, so the hand is easy to print and quick to put together.',
          '<a href="cueddata">CuedData</a>’s prefabricated hand couldn’t move its index finger sideways, so it couldn’t form the 8th handshape. CuedKit gives the index finger its own servo.',
        ],
        columns: 3,
        media: [
          { src: 'assets/projects/cuedkit/web/index-rotate-blender.mp4', poster: 'assets/projects/cuedkit/web/index-rotate-blender-poster.jpg', ratio: '4 / 3', caption: 'Designing in Blender' },
          { src: 'assets/projects/cuedkit/web/iterations1.jpg', ratio: '4 / 3', caption: 'Iterations' },
          { src: 'assets/projects/cuedkit/web/index-open.jpg?v=2', ratio: '4 / 3', caption: 'Index finger open' },
          { src: 'assets/projects/cuedkit/web/hand2.mp4', poster: 'assets/projects/cuedkit/web/hand2-poster.jpg', ratio: '4 / 3', alt: 'The hand moving', caption: 'Hand inside' },
          { src: 'assets/projects/cuedkit/web/finished-hand.jpg', ratio: '4 / 3', alt: 'The finished hand and arm', caption: 'Finished hand, front' },
          { src: 'assets/projects/cuedkit/web/finished-hand-2.jpg', ratio: '4 / 3', alt: 'The finished hand and arm', caption: 'Finished hand, side' },
        ],
      },
      {
        text: 'Step-by-step guides like these are live on the website. See more in the next section.',
        columns: 3,
        media: [
          { src: 'assets/projects/cuedkit/web/tutorial1.mp4', poster: 'assets/projects/cuedkit/web/tutorial1-poster.jpg', ratio: '16 / 9' },
          { src: 'assets/projects/cuedkit/web/tutorial2.mp4', poster: 'assets/projects/cuedkit/web/tutorial2-poster.jpg', ratio: '16 / 9' },
          { src: 'assets/projects/cuedkit/web/tutorial4.mp4', poster: 'assets/projects/cuedkit/web/tutorial4-poster.jpg', ratio: '16 / 9' },
        ],
      },
      {
        title: 'How it works',
        label: 'Step 1',
        heading: 'Order the kit',
        text: 'Order a kit for about 50 USD (~330 CNY) from the website. It is available at cost, with no profit. This is nearly 60% cheaper than my previous version with a prefabricated hand.',
        beside: { src: 'assets/projects/cuedkit/web/concept-1.jpg', ratio: '1536 / 1024', alt: 'Concept: a child opening the kit' }, // same height as the passage
      },
      {
        label: 'Step 2',
        heading: 'Receive the kit',
        text: 'The kit arrives with the printed hand and arm, the electronics, and a face sheet printed on A4 that marks where the arm points for each hand position.',
        media: [
          { src: 'assets/projects/cuedkit/web/parts-list.jpg?v=2', ratio: '2000 / 548', alt: 'Parts list: hand, arm, electronics and the face sheet' },
        ],
      },
      {
        label: 'Step 3',
        split: true, // text on the left, recording on the right
        heading: 'Follow guided assembly',
        text: 'The user follows the step-by-step video tutorials to assemble the hand and the arm.',
        media: [
          { src: 'assets/projects/cuedkit/web/hand-assembly-page.mp4', poster: 'assets/projects/cuedkit/web/hand-assembly-page-poster.jpg', ratio: '1710 / 1696', caption: 'Hand assembly page' },
        ],
      },
      {
        label: 'Step 4',
        heading: 'Learn through the course',
        text: [
          'Finally, the user connects the hand to the web course, which teaches Cued Speech in thirteen short lessons, from the 8 handshapes and 5 positions to full sentences.',
          'On the pinyin chart, tap any sound and watch the hand cue it. Later, learners build the cue themselves by picking the handshape and position.',
          '<a class="pop" href="https://floracao111.github.io/cuedkit/download.html" target="_blank" rel="noopener">Preview the course website here!</a>',
        ],
        columns: 'row',
        media: [
          { src: 'assets/projects/cuedkit/web/course-alphabet.jpg', ratio: '1000 / 1076', caption: 'Pinyin chart' },
          { src: 'assets/projects/cuedkit/web/course-lesson.jpg', ratio: '1400 / 876', caption: 'Lesson: tap and watch the hand' },
        ],
      },
      {
        title: 'What’s next',
        text: [
          'CuedKit’s code and course are open source on <a class="pop" href="https://github.com/floracao111/cuedkit" target="_blank" rel="noopener">GitHub!</a>',
          'I am developing original finger mechanics so the whole hand can be fully open source, free for anyone to download and print.',
          'The current finger mechanism is adapted from <a href="https://makerworld.com/en/models/1772809-overengineered-mechanical-hand-v2-4-fingers" target="_blank" rel="noopener">Overengineered Mechanical Hand V2</a>, a licensed design by <a href="https://makerworld.com/@user_940602127" target="_blank" rel="noopener">TLPOD on MakerWorld</a>.',
        ],
      },
    ],
  },
  {
    slug: 'literal-language-machine',
    title: 'Literal Language Machine (LLM)',
    blurb: 'Little worker picking out tokens all day',
    tags: ['Robotics', 'AI', 'Installation'],
    summary:
      'LLMs predict the next most probable token to create text. </br> </br> I imagined ChatGPT as a little factory worker who spends all day picking up tokens to create sentences. </br> </br> A literal “Language Machine”.',
    meta: {
      Year: '2024',
      Medium: 'Magnetic screwdriver, bolts and nuts, Arduino Uno, 3D prints, servo motors, OpenAI API',
    },
    cover: { src: 'assets/projects/literal-language-machine/web/cover.mp4?v=2', poster: 'assets/projects/literal-language-machine/web/cover-poster.jpg?v=2' },
    hero: { src: 'assets/projects/literal-language-machine/web/vid2.mp4', poster: 'assets/projects/literal-language-machine/web/vid2-poster.jpg' },
    sections: [
      {
        label: 'Interface',
        text: 'An OpenAI API powered interface allows audience to chat with the little worker, and control the temperature setting.',
        columns: 2,
        media: [
          { src: 'assets/projects/literal-language-machine/web/chatting-with-bot-1.mp4', poster: 'assets/projects/literal-language-machine/web/chatting-with-bot-1-poster.jpg', ratio: '4 / 3' },
          { src: 'assets/projects/literal-language-machine/web/webpage-screenshot.png', ratio: '4 / 3', fit: 'contain' },
        ],
        textBelow: 'Low temperature, the worker sounds sane, normal.',
      },
      {
        columns: 2,
        textBelow: 'High temperature, the worker becomes disturbed, sentences break into random tokens.',
        media: [
          { src: 'assets/projects/literal-language-machine/web/chatting-with-bot-2.mp4', poster: 'assets/projects/literal-language-machine/web/chatting-with-bot-2-poster.jpg', ratio: '16 / 9' },
          { src: 'assets/projects/literal-language-machine/web/chatting-with-bot-result.mp4', poster: 'assets/projects/literal-language-machine/web/chatting-with-bot-result-poster.jpg', ratio: '16 / 9' },
        ],
      },
      {
        label: 'Process',
        columns: 3,
        media: [
          { src: 'assets/projects/literal-language-machine/web/process1.mp4', poster: 'assets/projects/literal-language-machine/web/process1-poster.jpg', ratio: '9 / 16' },
          { src: 'assets/projects/literal-language-machine/web/process2.mp4', poster: 'assets/projects/literal-language-machine/web/process2-poster.jpg', ratio: '9 / 16' },
          { src: 'assets/projects/literal-language-machine/web/process-3.mp4', poster: 'assets/projects/literal-language-machine/web/process-3-poster.jpg', ratio: '9 / 16' },
        ],
      },
      {
        columns: 1,
        media: [
          { src: 'assets/projects/literal-language-machine/web/process.png' },
        ],
      },
      // {
      //   columns: 1,
      //   media: [
      //     { src: 'assets/projects/literal-language-machine/web/vid1.mp4', poster: 'assets/projects/literal-language-machine/web/vid1-poster.jpg' },
      //   ],
      // },
    ],
  },
  {
    slug: 'vlm-inferential-privacy',
    title: 'Research: VLM Inferential Privacy Visualization',
    status: 'Under review', // bubble on the homepage cover

    blurb: 'Exploring design approaches for visualizing and addressing VLM inferential privacy risks.',
    tags: ['Research', 'HCI', 'Privacy', 'AI'],
    summary: 'How can we effectively visualize and address VLM inferential privacy risks across different contexts?',
    preface: 'This page provides a high level overview of ongoing research currently under review. The title and content have been adapted for portfolio presentation and do not reproduce the submitted paper.',
    meta: {
      Year: '2026',
      Research: 'Conference submission',
      'My role': 'Eliciting Design Space',
      Status: 'Under review',
    },
    // Kept to introductory material only while the paper is under anonymous review.
    cover: { src: 'assets/projects/vlm-inferential-privacy/web/inference-example.jpg', position: '60% 50%' },
    hero: false,
    sections: [
      {
        label: 'Background',
        text: 'VLM inferential privacy risks arise when sensitive personal attributes can be inferred from visual contexts through VLM reasoning. These risks are difficult to address because the inference process can be opaque and difficult to understand.',
      },
      {
        label: 'Gap',
        text: 'Existing research has benchmarked inferential privacy risks and shown that users are often unaware of them. However, practical methods and tools for addressing these risks remain limited, with existing defenses primarily manual and text based.',
      },
    ],
  },

  {
    slug: 'asapoop',
    title: 'ASAPoop',
    blurb: "What if one day, you could order a toilet just like you order a ride?",
    tags: ['Interactive Game', 'Physical Computing', 'Alt Controller'],
    summary:
      'What if one day, you could order a toilet just like you order a ride? </br> ASAPoop is an interactive game where players ride a stationary bike to deliver mobile toilets in the city. Built with a bike and a toilet combined with Arduino and Unity, the game uses bike riding as an alt controller for a toilet delivery service.',
    meta: {
      Context: 'Parsons DT Core Studio, group project: “Alternative Controller”',
      Role: 'Concept, Arduino, Hardware Fabrication, Video',
      Year: '2025',
      Medium: 'Portable toilet, old bike, bike trainer, tachometer, bike bell, Arduino, motor, wood, 3D prints, Unity interactive game',
      Collaborators:
        'Jiazhen Luo: Concept, Arduino, Hardware Fabrication; Daniel Meng: Game Development; Mere Cui: Game Illustration',
      Professor: 'Sven Travis',
    },
    logo: 'assets/projects/asapoop/web/asapoop-logo.png',
    // school logo, small, top-right of the homepage cover only
    coverLogos: [{ src: 'assets/projects/asapoop/web/logo-parsons.png', alt: 'Parsons School of Design', coverHeight: 16 }],
    cover: { src: 'assets/projects/asapoop/web/cover.mp4', poster: 'assets/projects/asapoop/web/cover-poster.jpg' },
    hero: { embed: 'https://player.vimeo.com/video/1072852598?h=f3d234d2d4', alt: 'ASAPoop — project video' },
    sections: [
      {
        columns: 2,
        media: [
          { src: 'assets/projects/asapoop/web/vid1.mp4', poster: 'assets/projects/asapoop/web/vid1-poster.jpg', ratio: '16 / 9' },
          { src: 'assets/projects/asapoop/web/vid2.mp4', poster: 'assets/projects/asapoop/web/vid2-poster.jpg', ratio: '16 / 9' },
        ],
      },
      {
        columns: 2,
        media: [
          { src: 'assets/projects/asapoop/web/vid4.mp4', poster: 'assets/projects/asapoop/web/vid4-poster.jpg', ratio: '16 / 9' },
          { src: 'assets/projects/asapoop/web/vid3.mp4', poster: 'assets/projects/asapoop/web/vid3-poster.jpg', ratio: '16 / 9' },
        ],
      },
      {
        label: 'How the system was built',
        columns: 'row', // the two diagrams side by side at the same height
        media: [
          { src: 'assets/projects/asapoop/web/diagram-build.jpg', ratio: '1290 / 765', alt: 'The bike controller: bike bell and open circuit, Arduino tachometer, bike trainer, servo motor with hinges and linkage, reconstructed bike parts' },
          { src: 'assets/projects/asapoop/web/diagram-flow.jpg', ratio: '1535 / 750', alt: 'How a game runs: a request comes in, the tachometer and bell send real-time signals to Unity, and on success the toilet seat opens' },
        ],
      },
      {
        label: 'Playtests',
        columns: 3,
        media: [
          { src: 'assets/projects/asapoop/web/real-player1.mp4', poster: 'assets/projects/asapoop/web/real-player1-poster.jpg', ratio: '3 / 4' },
          { src: 'assets/projects/asapoop/web/real-plaer2.mp4', poster: 'assets/projects/asapoop/web/real-plaer2-poster.jpg', ratio: '3 / 4' },
          { src: 'assets/projects/asapoop/web/real-player3.mp4', poster: 'assets/projects/asapoop/web/real-player3-poster.jpg', ratio: '3 / 4' },
        ],
      },
    ],
  },
  {
    slug: 'electric-noguchi',
    title: 'Electric Noguchi',
    blurb: 'Move light anywhere!',
    tags: ['Robotics', 'Design'],
    summary: 'Joystick-controlled Noguchi lamp. Move light anywhere!',
    meta: {
      Year: '2025',
      Medium: 'Lightbulb, Noguchi lampshade, 3D prints, aluminum profile, Arduino, servo motors, joystick',
    },
    cover: { src: 'assets/projects/electric-noguchi/web/cover.mp4?v=2', poster: 'assets/projects/electric-noguchi/web/cover-poster.jpg?v=2' },
    hero: false,
    sections: [
      {
        columns: 1,
        media: [{ src: 'assets/projects/electric-noguchi/web/video1.mp4', poster: 'assets/projects/electric-noguchi/web/video1-poster.jpg' }],
      },
      {
        columns: 2,
        media: [
          { src: 'assets/projects/electric-noguchi/web/img_1497.jpg', ratio: '4 / 3' },
          { src: 'assets/projects/electric-noguchi/web/img_1493.jpg', ratio: '4 / 3' },
        ],
      },
      {
        columns: 2,
        media: [
          { src: 'assets/projects/electric-noguchi/web/img_1494.jpg', ratio: '4 / 3' },
          { src: 'assets/projects/electric-noguchi/web/img_1498.jpg', ratio: '4 / 3' },
        ],
      },
    ],
  },
  {
    slug: 'heated-machines',
    title: 'Heated Machines',
    blurb: 'Steel, heat and the human body',
    tags: ['Installation', 'Video'],
    // summary:
    //   'Steel and the human body are two powerful forces that shaped industrialization. This era saw human strength and labor driving the transformation of the world. This work reflects on how this period marked a shift in the Anthropocene, defined by the physical efforts of humanity.',
    meta: {
      Year: '2024',
      Medium: 'Stainless steel, synthetic hair, indoor heater, projection mapping',
    },
    cover: { src: 'assets/projects/heated-machines/web/heated2.jpg' },
    hero: false,
    sections: [
            {
        columns: 3,
        media: [
          { src: 'assets/projects/heated-machines/web/heated1.jpg', ratio: '4 / 3' },
          { src: 'assets/projects/heated-machines/web/heated2.jpg', ratio: '4 / 3' },
          { src: 'assets/projects/heated-machines/web/heated5.jpg', ratio: '4 / 3' },
        ],
      },
      
      {
        label: 'Ideation',
        text: [
          'Massive factories and the physical labor shaped an era of transformation. The raw strength and versatility of steel and the human body is magnetic.',
          'The projection combines black-and-white visuals of the human body and steel, distorted to highlight their shared strength and structure.',
        ],
        columns: 'row',
        media: [
          { src: 'assets/projects/heated-machines/web/inspo-photo-of-historical-labor.png', ratio: '1151 / 2400', alt: 'Inspiration: historical photos of factory labor', caption: 'Inspo' },
          { src: 'assets/projects/heated-machines/web/images-of-body-for-my-projection.png', ratio: '2400 / 1730', alt: 'Images of the body and steel used in the projection', caption: 'Projection images' },
        ],
      },
      {
        text: 'The heat immerses viewers in the intensity of industrialization as they approach.',
        columns: 3,
        media: [
          { src: 'assets/projects/heated-machines/web/img_0609.mp4', poster: 'assets/projects/heated-machines/web/img_0609-poster.jpg', ratio: '9 / 16' },
          { src: 'assets/projects/heated-machines/web/img_0612.mp4', poster: 'assets/projects/heated-machines/web/img_0612-poster.jpg', ratio: '9 / 16' },
          { src: 'assets/projects/heated-machines/web/img_0691.mp4', poster: 'assets/projects/heated-machines/web/img_0691-poster.jpg', ratio: '9 / 16' },
        ],
      },
    ],
  },
  {
    slug: 'housekeeping',
    title: 'Housekeeping',
    blurb: 'Melting, cleaning up',
    tags: ['Installation'],
    summary:
      'The rational self keeps things moving.</br> It sticks to the tasks and gets through the day, while a softer, messier part quietly melts underneath.',
    meta: {
      Year: '2025',
      Medium: 'Aluminum extrusions, servo motors, rubber gloves, sponges, ice, keyboard part, Arduino',
    },
    cover: { src: 'assets/projects/housekeeping/web/cover.mp4?v=2', poster: 'assets/projects/housekeeping/web/cover-poster.jpg?v=2' },
    hero: false,
    sections: [
      {
        columns: 2,
        media: [
          { src: 'assets/projects/housekeeping/web/keyboard1.mp4', poster: 'assets/projects/housekeeping/web/keyboard1-poster.jpg', ratio: '16 / 9' },
          { src: 'assets/projects/housekeeping/web/vid1.mp4', poster: 'assets/projects/housekeeping/web/vid1-poster.jpg', ratio: '16 / 9' },
        ],
      },
      {
        label: 'Process',
        columns: 2,
        media: [
          { src: 'assets/projects/housekeeping/web/casting1.jpg', ratio: '4 / 3' },
          { src: 'assets/projects/housekeeping/web/casting2.jpg', ratio: '4 / 3' },
        ],
      },
      {
        columns: 2,
        media: [
          { src: 'assets/projects/housekeeping/web/img_9832.jpg', ratio: '4 / 3' },
          { src: 'assets/projects/housekeeping/web/keyboard.jpg', ratio: '4 / 3' },
        ],
      },
      {
        columns: 'row',
        media: [
          { src: 'assets/projects/housekeeping/web/img_9789.jpg', ratio: '3 / 4' },
          { src: 'assets/projects/housekeeping/web/img_9779.mp4', poster: 'assets/projects/housekeeping/web/img_9779-poster.jpg', ratio: '9 / 16' },
          { src: 'assets/projects/housekeeping/web/img_9839.jpg', ratio: '3 / 4' },
        ],
      },
    ],
  },
  {
    slug: 'light-senses-light',
    title: 'Light Senses Light',
    blurb: 'Light sculpture responding to other lights',
    tags: ['Installation', '3D Printing'],
    summary: 'Light sculpture responding to other lights.',
    meta: { Year: '2024', Medium: '3D prints, servo motors, Arduino' },
    cover: { src: 'assets/projects/light-senses-light/web/cover.mp4', poster: 'assets/projects/light-senses-light/web/cover-poster.jpg' },
    sections: [
      {
        columns: 3,
        media: [
          { src: 'assets/projects/light-senses-light/web/lamp1.jpg', ratio: '4 / 3' },
          { src: 'assets/projects/light-senses-light/web/lamp2.jpg', ratio: '4 / 3' },
          { src: 'assets/projects/light-senses-light/web/lamp4.jpg', ratio: '4 / 3' },
        ],
      },
    ],
  },
  {
    slug: 'cell',
    title: 'Cell',
    blurb: 'An android cell',
    tags: ['Installation'],
    summary: 'An android cell.',
    meta: { Year: '2024', Medium: 'Vinyl tubes, balloon, plastic globe, steel electrical box, water, hex nuts, resistors, water pump, Arduino' },
    cover: { src: 'assets/projects/cell/web/cover.mp4', poster: 'assets/projects/cell/web/cover-poster.jpg' },
    hero: { src: 'assets/projects/cell/web/cover-vid1.mp4', poster: 'assets/projects/cell/web/cover-vid1-poster.jpg' },
    sections: [
      {
        columns: 1,
        media: [
          { src: 'assets/projects/cell/web/vid2.mp4', poster: 'assets/projects/cell/web/vid2-poster.jpg', ratio: '16 / 9' },
        ],
      },
      {
        columns: 3,
        media: [
          { src: 'assets/projects/cell/web/waterclock3.jpg', ratio: '3 / 4' },
          { src: 'assets/projects/cell/web/waterclock2.jpg', ratio: '3 / 4' },
          { src: 'assets/projects/cell/web/waterclock1.jpg-20-44-47-831.jpg', ratio: '3 / 4' },
        ],
      },
    ],
  },
  {
    slug: 'synapses',
    title: 'Synapses',
    blurb: 'How do memory and attention deteriorate',
    tags: ['Installation', '3D Environments', 'Projection Mapping'],
    summary:
      'How do memory and attention deteriorate over time in both the organic and artificial mind?',
    meta: {
      Year: '2024',
      Medium: 'Metal, plaster, wires, 3D environments, sound, projection mapping',
      Duration: '05:26',
      'My role': 'Fabrication, Unity 3D environment design',
      Collaborator: 'Ryan Elgin: metal fabrication, sound, projection mapping',
    },
    cover: { src: 'assets/projects/synapses/web/img_9723.jpg' },
    hero: { embed: 'https://player.vimeo.com/video/1019055871?h=f6af766b76', alt: 'Synapses — project video' },
    sections: [
      {
        columns: 2,
        media: [
          { src: 'assets/projects/synapses/web/img_9334.mp4', poster: 'assets/projects/synapses/web/img_9334-poster.jpg', ratio: '16 / 9' },
          { src: 'assets/projects/synapses/web/img_9329.mp4', poster: 'assets/projects/synapses/web/img_9329-poster.jpg', ratio: '16 / 9' },
        ],
      },
      {
        label: '3D environments (Unity)',
        columns: 'row',
        media: [
          { src: 'assets/projects/synapses/web/img_9367.mp4', poster: 'assets/projects/synapses/web/img_9367-poster.jpg', ratio: '9 / 16' },
          { src: 'assets/projects/synapses/web/scene-1-and-pathway.mp4', poster: 'assets/projects/synapses/web/scene-1-and-pathway-poster.jpg', ratio: '16 / 9' },
          { src: 'assets/projects/synapses/web/messy-computer-scene.mp4', poster: 'assets/projects/synapses/web/messy-computer-scene-poster.jpg', ratio: '16 / 9' },
        ],
      },
      {
        label: 'Projection mapping',
        columns: 'row',
        media: [
          { src: 'assets/projects/synapses/web/img_9490.mp4', poster: 'assets/projects/synapses/web/img_9490-poster.jpg', ratio: '9 / 16' },
          { src: 'assets/projects/synapses/web/img_9383.mp4', poster: 'assets/projects/synapses/web/img_9383-poster.jpg', ratio: '16 / 9' },
          { src: 'assets/projects/synapses/web/img_9394.mp4', poster: 'assets/projects/synapses/web/img_9394-poster.jpg', ratio: '16 / 9' },
        ],
      },
      {
        columns: 2,
        media: [
          { src: 'assets/projects/synapses/web/untitled2.jpg', ratio: '3 / 4' },
          { src: 'assets/projects/synapses/web/untitled1.jpg', ratio: '3 / 4' },
        ],
      },
    ],
  },
  {
    slug: 'tied',
    title: 'Tied',
    blurb: 'My Amazon shopping data',
    tags: ['Data', 'Installation'],
    summary:
      "Tied to consumption, I'm always moving, buying. </br> The faint hologram displays everything I purchased in the past three months. All of it playing an important yet temporary role in my life. The movement of the hair follows how long I spent shopping, according to the data Amazon collected.",
    meta: {
      Year: '2024',
      Medium: 'Acrylic, synthetic hair, fishing line, servo motors, Arduino, tablet',
    },
    cover: { src: 'assets/projects/tied/web/cover.mp4', poster: 'assets/projects/tied/web/cover-poster.jpg' },
    hero: { src: 'assets/projects/tied/web/vid1.mp4', poster: 'assets/projects/tied/web/vid1-poster.jpg' },
    sections: [
      {
        columns: 'row',
        media: [
          { src: 'assets/projects/tied/web/amazon1.png', ratio: '1582 / 1328', alt: 'Amazon order history' },
          { src: 'assets/projects/tied/web/amazon2.png', ratio: '1478 / 1412', alt: 'Amazon order history' },
          { src: 'assets/projects/tied/web/amazon3.png', ratio: '1656 / 1324', alt: 'Amazon order history' },
        ],
      },
      {
        columns: 1,
        media: [
          { src: 'assets/projects/tied/web/img_9157.mp4', poster: 'assets/projects/tied/web/img_9157-poster.jpg', ratio: '16 / 9' },
        ],
      },
    ],
  },
];
