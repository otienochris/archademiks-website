const courseCategories = [
  'Tech Tools',
  'Assignment',
  'Agriculture',
  'Programming',
  'IT',
  'Mathematics',
  'Chemistry',
  'Biology',
  'Computer Hardware',
  'AI',
  'Music',
  'UI/UX',
  'Business',
  'Content Creation',
  'DevOps',
];

export const list = [
  {
    id: 1,
    title: 'Introduction to Academic Writing',
    thumbnail: 'https://www.deccanherald.com/sites/dh/files/1_169.jpg',
    description:
      'A complete introduction to academic writing. This course course is for both beginners and experienced writers. It expores best practices and common mistakes and misconceptions.',
    rating: 5,
    price: 999.0,
    category: courseCategories[1],
    numberOfEnrolledStudents: 14,
    creationDate: '08/04/2022',
    modificationDate: '08/04/2022',
    links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
    topics: [
      {
        id: 1,
        title: 'Introduction',
        description:
          'In this section, you will learn how to be effective in academic writing. It assumes you have little to no knowledge regarding this topic. Thus, it expounds even the topics one might consider obvious. ',
        content: 'Tools and Skills required',
        links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
        subTopics: [
          {
            id: 1,
            title: 'Grammarly',
            description: 'Some description',
            content: 'Grammarly',
            links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
            content: 'Tools and Skills required',
          },
        ],
      },
      {
        id: 2,
        title: 'Tools and Skills required',
        description: 'Some description',
        content: 'Tools and Skills required',
        links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
        subTopics: [
          {
            id: 1,
            title: 'Grammarly',
            description: 'Some description',
            content: 'Grammarly',
            links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
            content: 'Tools and Skills required',
          },
        ],
      },
      {
        id: 3,
        title: 'Grammar',
        description: 'Some description',
        content: 'Tools and Skills required',
        links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
        subTopics: [
          {
            id: 1,
            title: 'Grammarly',
            description: 'Some description',
            content: 'Grammarly',
            links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
            content: 'Tools and Skills required',
          },
        ],
      },
      {
        id: 4,
        title: 'Introduction',
        description:
          'In this section, you will learn how to be effective in academic writing. It assumes you have little to no knowledge regarding this topic. Thus, it expounds even the topics one might consider obvious. ',
        content: 'Tools and Skills required',
        links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
        subTopics: [
          {
            id: 1,
            title: 'Grammarly',
            description: 'Some description',
            content: 'Grammarly',
            links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
            content: 'Tools and Skills required',
          },
        ],
      },
      {
        id: 5,
        title: 'Tools and Skills required',
        description: 'Some description',
        content: 'Tools and Skills required',
        links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
        subTopics: [
          {
            id: 1,
            title: 'Grammarly',
            description: 'Some description',
            content: 'Grammarly',
            links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
            content: 'Tools and Skills required',
          },
        ],
      },
      {
        id: 6,
        title: 'Grammar',
        description: 'Some description',
        content: 'Tools and Skills required',
        links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
        subTopics: [
          {
            id: 1,
            title: 'Grammarly',
            description: 'Some description',
            content: 'Grammarly',
            links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
            content: 'Tools and Skills required',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Introduction to Git and Github',
    thumbnail:
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1591131852370/IFpbWxxJU.png',
    description:
      'A complete introduction to academic writing. This course course is for both beginners and experienced writers. It expores best practices and common mistakes and misconceptions.',
    rating: 1,
    price: 90.0,
    category: courseCategories[0],
    numberOfEnrolledStudents: 14,
    creationDate: '08/04/2022',
    modificationDate: '08/04/2022',
    links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
    topics: [
      {
        id: 1,
        title: 'Introduction',
        description: 'Some description',
        content: 'Tools and Skills required',
        links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
        subTopics: [
          {
            id: 1,
            title: 'Grammarly',
            description: 'Some description',
            content: 'Grammarly',
            links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
            content: [
              { id: 1, subTopicId: 1, content: 'some random content ' },
            ],
          },
        ],
      },
      {
        id: 2,
        title: 'Commands',
        description: 'Some description',
        content: 'Tools and Skills required',
        links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
        subTopics: [
          {
            id: 1,
            title: 'Grammarly',
            description: 'Some description',
            content: 'Grammarly',
            links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
            content: [
              { id: 1, subTopicId: 1, content: 'some random content ' },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 3,
    title: 'Introduction to HTML, CSS and Javascript',
    thumbnail:
      'https://cdn3.vectorstock.com/i/1000x1000/91/17/website-development-banner-programming-technology-vector-25839117.jpg',
    description:
      'A complete introduction to academic writing. This course course is for both beginners and experienced writers. It expores best practices and common mistakes and misconceptions.',
    rating: 4,
    price: 0.0,
    category: courseCategories[3],
    numberOfEnrolledStudents: 14,
    creationDate: '08/04/2022',
    modificationDate: '08/04/2022',
    links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
    topics: [
      {
        id: 1,
        title: 'Tools and Skills required',
        description: 'Some description',
        content: 'Tools and Skills required',
        links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
        subTopics: [
          {
            id: 1,
            title: '',
            description: 'Some description',
            content: 'Grammarly',
            links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
            content: 'Tools and Skills required',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Fish Farming',
    thumbnail:
      'https://www.farmafrica.org/images/news/2020/fish-farming-_cropped.jpg',
    description:
      'A complete introduction to academic writing. This course course is for both beginners and experienced writers. It expores best practices and common mistakes and misconceptions.',
    rating: 5,
    price: 999.0,
    category: courseCategories[2],
    numberOfEnrolledStudents: 14,
    creationDate: '08/04/2022',
    modificationDate: '08/04/2022',
    links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
    topics: [
      {
        id: 1,
        title: 'Tools and Skills required',
        description: 'Some description',
        content: 'Tools and Skills required',
        links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
        subTopics: [
          {
            id: 1,
            title: '',
            description: 'Some description',
            content: 'Grammarly',
            links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
            content: 'Tools and Skills required',
          },
        ],
      },
    ],
  },

  {
    id: 5,
    title: 'Creating You tube videos in Ubuntu',
    thumbnail:
      'https://atozmarketing.eu/wp-content/uploads/2015/07/content_creation_online_marketing_atozmarketing.png',
    description:
      'A complete introduction to academic writing. This course course is for both beginners and experienced writers. It expores best practices and common mistakes and misconceptions.',
    rating: 5,
    price: 999.0,
    category: courseCategories[13],
    numberOfEnrolledStudents: 14,
    creationDate: '08/04/2022',
    modificationDate: '08/04/2022',
    links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
    topics: [
      {
        id: 1,
        title: 'Tools and Skills required',
        description: 'Some description',
        content: 'Tools and Skills required',
        links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
        subTopics: [
          {
            id: 1,
            title: 'Grammarly',
            description: 'Some description',
            links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
            content: 'Tools and Skills required',
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Docker with Spring Boot',
    thumbnail: 'https://i.morioh.com/2019/12/12/f11c284adcc6.jpg',
    description:
      'A complete introduction to academic writing. This course course is for both beginners and experienced writers. It expores best practices and common mistakes and misconceptions.',
    rating: 1,
    price: 90.0,
    category: courseCategories[14],
    numberOfEnrolledStudents: 14,
    creationDate: '08/04/2022',
    modificationDate: '08/04/2022',
    links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
    topics: [
      {
        id: 1,
        title: 'Tools and Skills required',
        content: 'Tools and Skills required',
        links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
        subTopics: [
          {
            id: 1,
            content: 'Grammarly',
            links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
            content: 'Tools and Skills required',
          },
        ],
      },
    ],
  },

  {
    id: 7,
    title: 'Testing Spring boot Applictions',
    thumbnail:
      'https://programmer.group/images/article/db5f3a0c5e4627719daf8d2bfd72c63f.jpg',
    description:
      'A complete introduction to academic writing. This course course is for both beginners and experienced writers. It expores best practices and common mistakes and misconceptions. A complete introduction to academic writing. This course course is for both beginners and experienced writers. It expores best practices and common mistakes and misconceptions.',
    rating: 4,
    price: 0.0,
    category: courseCategories[4],
    numberOfEnrolledStudents: 14,
    creationDate: '08/04/2022',
    modificationDate: '08/04/2022',
    links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
    topics: [
      {
        id: 1,
        title: 'Tools and Skills required',
        content: 'Tools and Skills required',
        links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
        subTopics: [
          {
            id: 1,
            content: 'Grammarly',
            links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
            content: 'Tools and Skills required',
          },
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Introduction to AI',
    thumbnail: 'http://news.callapr.co.ke/wp-content/uploads/2021/09/AI.jpg',
    description:
      'A complete introduction to academic writing. This course course is for both beginners and experienced writers. It expores best practices and common mistakes and misconceptions.',
    rating: 5,
    price: '1999.00',
    category: courseCategories[9],
    numberOfEnrolledStudents: 14,
    creationDate: '08/04/2022',
    modificationDate: '08/04/2022',
    links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
    topics: [
      {
        id: 1,
        title: 'Tools and Skills required',
        description: 'Some description',
        content: 'Tools and Skills required',
        links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
        subTopics: [
          {
            id: 1,
            description: 'Some description',
            content: 'Grammarly',
            links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
            content: 'Tools and Skills required',
          },
        ],
      },
    ],
  },
];
