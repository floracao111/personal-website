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
    { id: 'about', label: 'About', href: 'about.html' },
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
   hero      the large visual at the top of the project page (false = none).
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
    },
    logosOnCover: true, // also show the logos, small, on the homepage cover
    logos: [
      { src: 'assets/projects/cueddata/web/voibook.png', alt: 'Voibook', coverHeight: 20 },
      { src: 'assets/projects/cueddata/web/hkustgz.png', alt: 'HKUST (Guangzhou)', height: 36 },
    ],
    cover: {
      src: 'assets/projects/cueddata/web/production-page-demo.mp4?v=2',
      poster: 'assets/projects/cueddata/web/production-page-demo-poster.jpg?v=2',
      position: 'left', // keep the robot hand in the 3:2 homepage crop
    },
    intro: {
      text: [
        'While Cued Speech has demonstrated educational value internationally, Mandarin Cued Speech remains underrepresented in AI research due to the lack of large-scale, standardized datasets.',
        'Commissioned by Voibook, a hearing-accessibility technology company in China, I developed CuedData to automate the generation of standardized Mandarin Cued Speech recordings for AI recognition training and future speech education.',
      ],
    },
    // Portfolio pages — made with: zsh scripts/normalize-pages.sh <folder of page images> assets/projects/cueddata/web/pages
    hero: {
      alt: 'CuedData portfolio',
      ratio: '2000 / 1414',
      pages: [
        'assets/projects/cueddata/web/pages/page-01.jpg',
        'assets/projects/cueddata/web/pages/page-02.jpg',
        'assets/projects/cueddata/web/pages/page-03.jpg',
        'assets/projects/cueddata/web/pages/page-04.jpg',
        'assets/projects/cueddata/web/pages/page-05.jpg',
        'assets/projects/cueddata/web/pages/page-06.jpg',
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
    status: 'In progress', // shown on the homepage cover and at the top of the project page
    blurb: 'An easy, open-source robotic hand kit for education and research',
    tags: ['Robotics', 'Open Source', 'Physical Computing', 'Assistive Technology'],
    summary:
      'A low-cost, open-source robotic hand kit that is easy to print, assemble and program, and dexterous enough to form Cued Speech handshapes. The next step after CuedData.',
    meta: {
      Timeline: 'July 2026 – present',
      Role: 'Designer & Developer',
      Status: 'In progress',
      Follows: { text: 'CuedData', href: 'project.html?p=cueddata' },
    },
    logo: 'assets/projects/cuedkit/web/cuedkit-logo.svg',
    cover: { src: 'assets/projects/cuedkit/web/cover.mp4', poster: 'assets/projects/cuedkit/web/cover-poster.jpg' },
    hero: [
      { src: 'assets/projects/cuedkit/web/cover-vid.mp4', poster: 'assets/projects/cuedkit/web/cover-vid-poster.jpg', ratio: '4 / 3', alt: 'CuedKit hand moving' },
      { src: 'assets/projects/cuedkit/web/iterations1.jpg', ratio: '4 / 3', alt: 'Five printed hand iterations' },
    ],
    sections: [
      {
        label: 'Origin',
        text: [
          'While building <a href="project.html?p=cueddata">CuedData</a>, I needed a robotic hand. None were easy to print or assemble, so I bought a prefabricated one. It wasn’t cheap, and it still couldn’t make one of the handshapes, a peace sign. The more dexterous options cost far more.',
          'So I’m building my own: easy to print, simple to assemble, and just dexterous enough for Cued Speech. I’m packaging it as a kit and open-sourcing it, so others in need don’t run into the same problem.',
        ],
      },
      {
        heading: 'Why a physical robot?',
        text: [
          'Physical teaching aids like solar system models and skeletons are still used, even where a video could replace them. A robotic hand can sit on a desk, hold a shape, and be played with.',
          'At HKUST (Guangzhou), I met the Mandarin Cued Speech team. They go into special schools and teach students in person rather than sending videos.',
        ],
        stat: {
          value: '73%',
          text: 'of studies comparing them found people respond more positively to a robot in the room than the same robot on a screen.',
          source: 'Li, International Journal of Human-Computer Studies, 2015',
        },
      },
      {
        list: [
          { term: 'Who it’s for', text: 'Teachers, speech therapists, research labs, and curious families' },
          { term: 'What they need', text: 'More affordable, hands-on learning resources' },
        ],
      },
      {
        heading: 'Where CuedKit sits',
        text: 'Yale OpenHand showed open-source hands can be research-grade. e-NABLE showed open-source 3D prints can reach people in need. Makeblock showed kits can be fun and educational. Robotics labs showed robotic hands can sign.',
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
        },
        textAfter: 'No one combines all four. CuedKit aims to be the first open-source, low-cost robotic hand kit built for language.',
      },
      {
        label: 'Design question',
        quote: 'How can I make an affordable, educational robotic hand that anyone can build?',
      },
      {
        label: 'Robotic hand iterations',
        text: [
          'Printed hands, refined until they were simple enough for a beginner to assemble.',
          'The individual finger mechanism comes from <a href="https://makerworld.com/en/models/1772809-overengineered-mechanical-hand-v2-4-fingers" target="_blank" rel="noopener">Overengineered Mechanical Hand V2</a> by TLPOD on MakerWorld. I designed the rest of the hand around it.',
          'The prefabricated hand in CuedData couldn’t move its index finger on its own, so it couldn’t form every handshape. This hand gives the index finger its own servo, so it can achieve the peace sign, without adding complexity to the rest of the hand.',
        ],
        columns: 3,
        media: [
          { src: 'assets/projects/cuedkit/web/iterations2.jpg', ratio: '4 / 3', caption: 'Iterations' },
          { src: 'assets/projects/cuedkit/web/index-open.jpg', ratio: '4 / 3', caption: 'Index finger open' },
          { src: 'assets/projects/cuedkit/web/index-close.jpg', ratio: '4 / 3', caption: 'Index finger closed' },
        ],
      },
      {
        label: 'Assembly tutorial',
        text: 'Step-by-step tutorials like these will live on the CuedKit website.',
        columns: 3,
        media: [
          { src: 'assets/projects/cuedkit/web/tutorial1.mp4', poster: 'assets/projects/cuedkit/web/tutorial1-poster.jpg', ratio: '16 / 9', caption: 'Step 1' },
          { src: 'assets/projects/cuedkit/web/tutorial2.mp4', poster: 'assets/projects/cuedkit/web/tutorial2-poster.jpg', ratio: '16 / 9', caption: 'Step 2' },
          { src: 'assets/projects/cuedkit/web/tutorial3.mp4', poster: 'assets/projects/cuedkit/web/tutorial3-poster.jpg', ratio: '16 / 9', caption: 'Step 3' },
        ],
      },
      {
        label: 'Interface',
        heading: 'In progress',
        text: [
          'Next is a website that walks people through assembling the hand and then lets them operate it, choosing a handshape and watching the hand form it.',
          'People will have two options: download the 3D files and source the listed motors themselves, or order a ready-to-build kit from me with the printed hand and every motor included. Either way, they assemble it with the tutorials, connect it to the website, and start using it right away.',
        ],
      },
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
    slug: 'literal-language-machine',
    title: 'Literal Language Machine (LLM)',
    blurb: 'Little worker picking out tokens all day',
    tags: ['Robotics', 'AI', 'Installation'],
    summary:
      'A robotic arm simulating the behavior of large language models with an unthinking nature as it picks up bolts and nuts like tokens, representing the way AI systems process language. </br> </br> I imagined ChatGPT to be a little worker who spends all day picking up bolts and nuts, just like how a large language model picks out tokens. </br>  </br> An OpenAI API powered interface allows audience to chat with the little worker, and control the temperature setting.',
    meta: {
      Year: '2024',
      Medium: 'Magnetic screwdriver, bolts and nuts, Arduino Uno, 3D prints, servo motors, OpenAI API',
    },
    cover: { src: 'assets/projects/literal-language-machine/web/cover.mp4?v=2', poster: 'assets/projects/literal-language-machine/web/cover-poster.jpg?v=2' },
    hero: { src: 'assets/projects/literal-language-machine/web/vid2.mp4', poster: 'assets/projects/literal-language-machine/web/vid2-poster.jpg' },
    sections: [
      {
        label: 'Interface',
        columns: 2,
        media: [
          { src: 'assets/projects/literal-language-machine/web/chatting-with-bot-1.mp4', poster: 'assets/projects/literal-language-machine/web/chatting-with-bot-1-poster.jpg', ratio: '4 / 3' },
          { src: 'assets/projects/literal-language-machine/web/webpage-screenshot.png', ratio: '4 / 3', fit: 'contain' },
        ],
      },
      {
        columns: 2,
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
    slug: 'asapoop',
    title: 'ASAPoop',
    blurb: "What if one day, you could order a toilet just like you order a ride?",
    tags: ['Interactive Game', 'Physical Computing', 'Alt Controller'],
    summary:
      'What if one day, you could order a toilet just like you order a ride? </br> ASAPoop is an interactive game where players ride a stationary bike to deliver mobile toilets in the city. Built with a bike and a toilet combined with Arduino and Unity, the game uses bike riding as an alt controller for a toilet delivery service.',
    meta: {
      Year: '2025',
      Medium: 'Portable toilet, old bike, bike trainer, tachometer, bike bell, Arduino, motor, wood, 3D prints, Unity interactive game',
      Role: 'Concept, Arduino & hardware fabrication, video, visual identity',
      Collaborators:
        'Jiazhen Luo: Arduino & Hardware Fabrication, Daniel Meng: Game Development, Mere Cui: Game Illustration',
    },
    logo: 'assets/projects/asapoop/web/asapoop-logo.png',
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
        label: 'Players',
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
          'Massive factories and the physical labor shaped an era of transformation. The raw strength and versatility of steel and the human body is incredibly attractive.',
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
      Medium: 'Aluminum extrusions, DC motors, rubber gloves, sponges, ice, keyboard part, Arduino',
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
    cover: { src: 'assets/projects/light-senses-light/web/auto-lamp.mp4', poster: 'assets/projects/light-senses-light/web/auto-lamp-poster.jpg' },
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
        columns: 3,
        media: [
          { src: 'assets/projects/synapses/web/img_9334.mp4', poster: 'assets/projects/synapses/web/img_9334-poster.jpg', ratio: '16 / 9' },
          { src: 'assets/projects/synapses/web/img_9329.mp4', poster: 'assets/projects/synapses/web/img_9329-poster.jpg', ratio: '16 / 9' },
          { src: 'assets/projects/synapses/web/img_9184.mp4', poster: 'assets/projects/synapses/web/img_9184-poster.jpg', ratio: '16 / 9' },
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
      Medium: 'Acrylic, synthetic hair, fishing line, Arduino, tablet',
    },
    cover: { src: 'assets/projects/tied/web/cover.mp4', poster: 'assets/projects/tied/web/cover-poster.jpg' },
    hero: { src: 'assets/projects/tied/web/vid1.mp4', poster: 'assets/projects/tied/web/vid1-poster.jpg' },
    sections: [
      {
        columns: 1,
        media: [
          { src: 'assets/projects/tied/web/img_9157.mp4', poster: 'assets/projects/tied/web/img_9157-poster.jpg', ratio: '16 / 9' },
        ],
      },
    ],
  },
];
