import { createSlice } from '@reduxjs/toolkit';

export const courseCategories = [
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

const instructorsList = [
  {
    id: 1,
    firstName: 'Christopher',
    lastName: 'Otieno',
    title: 'Software Engineer',
    briefDescription:
      'Christopher teaches using apt strategies that ensures students achieve the best.',
    contacts: [
      {
        id: 1,
        title: 'linkedin',
        url: 'https://www.linkedin.com/in/christopher-otieno-556779193/',
      },
      {
        id: 2,
        title: 'facebook',
        url: 'https://www.linkedin.com/in/christopher-otieno-556779193/',
      },
      {
        id: 3,
        title: 'slack',
        url: 'https://archademiks.slack.com/archives/C03BAMJV0JJ',
      },
      {
        id: 4,
        title: 'whatsapp',
        url: '+254772348798',
      },
    ],
  },
  {
    id: 1,
    firstName: 'Steve',
    lastName: 'Mboya',
    title: 'Surveyor',
    briefDescription:
      'Steve teaches using apt strategies that ensures students achieve the best.',
    contacts: [
      {
        id: 1,
        title: 'linkedin',
        url: '',
      },
      {
        id: 2,
        title: 'facebook',
        url: '',
      },
      {
        id: 3,
        title: 'slack',
        url: '',
      },
      {
        id: 4,
        title: 'whatsapp',
        url: '+254704869094',
      },
    ],
  },
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
    // numberOfEnrolledStudents: 14,
    creationDate: '2022-01-08',
    modificationDate: '2022-01-08',
    link: '',
    instructors: [instructorsList[0]],
    topics: [
      {
        id: 1,
        title: 'Introduction',
        description:
          'In this section, you will learn how to be effective in academic writing. It assumes you have little to no knowledge regarding this topic. Thus, it expounds even the topics one might consider obvious. ',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: 'What is Academic English',
            description: 'Some description',
            link: 'MyTLosz6aHA',
            content: 'Tools and Skills required',
          },
          {
            id: 2,
            title: 'What is Academic Writing',
            description: 'Some description',
            link: '',
            content: 'Tools and Skills required',
          },
          {
            id: 3,
            title: 'Example of Academic writing works',
            description: 'Some description',
            link: '',
            content: 'Tools and Skills required',
          },
        ],
      },
      {
        id: 2,
        title: 'Tools and Skills required',
        description: 'Some description',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: 'Microsoft Office',
            description: 'Some description',
            link: '',
            content: 'Tools and Skills required',
          },
          {
            id: 1,
            title: 'Productivity Tools',
            description: 'Some description',
            link: '',
            content: 'Tools and Skills required',
          },
        ],
      },
      {
        id: 3,
        title: 'Microsoft Office',
        description: 'Some description',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: 'Word',
            description: 'Some description',
            link: 'Cw6a3b5QoAs',
            content: 'Tools and Skills required',
          },
          {
            id: 2,
            title: 'Excell',
            description: 'Some description',
            link: 'e7xGuGqgp-Q',
            content: 'Tools and Skills required',
          },
          {
            id: 3,
            title: 'PowerPoint',
            description: 'Some description',
            link: 'u7Tku3_RGPs',
            content: 'Tools and Skills required',
          },
        ],
      },
      {
        id: 4,
        title: 'Productivity Tools',
        description:
          'In this section, you will learn how to be effective in academic writing. It assumes you have little to no knowledge regarding this topic. Thus, it expounds even the topics one might consider obvious. ',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: 'Grammarly',
            description: 'Some description',
            link: 'FJ_ZWAUO78s',
            content: 'Tools and Skills required',
          },
          {
            id: 2,
            title: 'Turnitin',
            description: 'Some description',
            link: '7lsBltqZREo',
            content: 'Tools and Skills required',
          },
          {
            id: 2,
            title: 'Turnitin - part 2',
            description: 'Some description',
            link: 'TJ_bVcaX8QQ',
            content: 'Tools and Skills required',
          },
          {
            id: 2,
            title: 'Google',
            description: 'Some description',
            link: 'UiEBoH3qesk',
            content: 'Tools and Skills required',
          },
        ],
      },
      {
        id: 5,
        title: 'Interpreting Requirements',
        description: 'Some description',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: 'Identification of must haves',
            description: 'Some description',
            link: '',
            content: 'Tools and Skills required',
          },
          {
            id: 1,
            title: 'Identification of Scope',
            description: 'Some description',
            link: '',
            content: 'Tools and Skills required',
          },
          {
            id: 1,
            title: 'Creation of outline',
            description: 'Some description',
            link: '',
            content: 'Tools and Skills required',
          },
        ],
      },
      {
        id: 6,
        title: 'Researching',
        description: 'Some description',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: 'Credibility',
            description: 'Some description',
            link: '',
            content: 'Tools and Skills required',
          },
        ],
      },
      {
        id: 7,
        title: 'Annotation and References',
        description: 'Some description',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: 'API',
            description: 'Some description',
            link: '',
            content: 'Tools and Skills required',
          },
          {
            id: 2,
            title: 'MLA',
            description: 'Some description',
            link: '',
            content: 'Tools and Skills required',
          },
        ],
      },
      {
        id: 8,
        title: 'Review and Submission',
        description: 'Some description',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: 'Grammarly',
            description: 'Some description',
            link: '',
            content: 'Tools and Skills required',
          },
        ],
      },
      {
        id: 6,
        title: 'Communication and Collaboration',
        description: 'Some description',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: 'Email',
            description: 'Some description',
            link: '',
            content: 'Tools and Skills required',
          },
          {
            id: 2,
            title: 'Mobile Phone',
            description: 'Some description',
            link: '',
            content: 'Tools and Skills required',
          },
          {
            id: 3,
            title: 'Written and Spoken English/Kiswahili',
            description: 'Some description',
            link: '',
            content: 'Tools and Skills required',
          },
        ],
      },
      {
        id: 8,
        title: 'Tips and Tricks',
        description: 'Some description',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: 'Word',
            description: 'Some description',
            link: 'LxgheItBIzQ',
            content: 'Tools and Skills required',
          },
          {
            id: 2,
            title: 'MLA',
            description: 'Some description',
            link: '',
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
    // numberOfEnrolledStudents: 14,
    creationDate: '2022-03-02',
    modificationDate: '2022-03-02',
    link: '',
    instructors: [instructorsList[1]],
    topics: [
      {
        id: 1,
        title: 'Introduction',
        description: 'Some description',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: 'Grammarly',
            description: 'Some description',
            link: '',
            content: 'some random content ',
          },
        ],
      },
      {
        id: 2,
        title: 'Commands',
        description: 'Some description',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: 'Grammarly',
            description: 'Some description',
            content: 'some random content ',
            link: '',
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
    // numberOfEnrolledStudents: 14,
    creationDate: '2022-02-02',
    modificationDate: '2022-02-02',
    links: [{ id: 1, title: 'introduction to Grammarly', link: '' }],
    instructors: [instructorsList[0]],
    topics: [
      {
        id: 1,
        title: 'Tools and Skills required',
        description: 'Some description',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: '',
            description: 'Some description',
            link: '',
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
    // numberOfEnrolledStudents: 14,
    creationDate: '2021-12-08',
    modificationDate: '2021-12-08',
    link: '',
    instructors: [instructorsList[0]],
    topics: [
      {
        id: 1,
        title: 'Tools and Skills required',
        description: 'Some description',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: '',
            description: 'Some description',
            link: '',
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
    // numberOfEnrolledStudents: 14,
    creationDate: '2022-4-08',
    modificationDate: '2021-12-08',
    link: '',
    instructors: [instructorsList[0]],
    topics: [
      {
        id: 1,
        title: 'Tools and Skills required',
        description: 'Some description',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            title: 'Grammarly',
            link: '',
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
    // numberOfEnrolledStudents: 14,
    creationDate: '2020-12-08',
    modificationDate: '2020-12-08',
    link: '',
    instructors: [instructorsList[0]],
    topics: [
      {
        id: 1,
        title: 'Tools and Skills required',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            link: '',
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
    // numberOfEnrolledStudents: 14,
    creationDate: '2020-12-08',
    modificationDate: '2020-12-08',
    link: '',
    instructors: [instructorsList[0]],
    topics: [
      {
        id: 1,
        title: 'Tools and Skills required',
        content: 'Tools and Skills required',
        link: '',
        subTopics: [
          {
            id: 1,
            link: '',
            content: 'Tools and Skills required',
          },
        ],
      },
    ],
  },
];

const subTopicObject = {
  id: 1,
  title: '',
  description: '',
  link: '',
  content: '',
};

const topicObject = {
  id: 0,
  title: '',
  description: '',
  content: '',
  link: '',
  subTopics: [subTopicObject],
};

const courseObject = {
  id: 0,
  title: '',
  thumbnail: '',
  description: '',
  rating: 0,
  price: 0,
  category: [],
  creationDate: '',
  modificationDate: '',
  link: '',
  instructors: [],
  topics: [topicObject],
};

export const coursesSlice = createSlice({
  name: 'courses',
  initialState: { value: list },
  reducers: {
    deleteCourse: (state, action) => {
      const newList = state.value.filter(
        (course) => course.id != action.payload
      );
      state.value = newList;
    },
  },
});

export const { deleteCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
