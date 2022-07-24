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

const subtopicDescription =
  'Object-oriented programming (OOP) is a computer programming model that organizes software design around data, or objects, rather than functions and logic. An object can be defined as a data field that has unique attributes and behavior. OOP focuses on the objects that developers want to manipulate rather than the logic required to manipulate them. This approach to programming is well-suited for programs that are large, complex and actively updated or maintained. This includes programs for manufacturing and design, as well as mobile applications; for example, OOP can be used for manufacturing system simulation software.';

const sampleContent =
  '<h3 style="margin-left:0px;"><span style="color: rgb(50,50,50);background-color: rgb(255,255,255);font-size: 20px;font-family: Arial, sans-serif;">What is object-oriented programming?</span></h3><p style="margin-left:0px;"><span style="color: rgb(108,108,108);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;">Object-oriented programming (OOP) is a computer programming model that organizes software design around data, or objects, rather than functions and logic. An object can be defined as a data field that has unique attributes and behavior.</span></p><p style="margin-left:0px;"><span style="color: rgb(108,108,108);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;">OOP focuses on the objects that developers want to manipulate rather than the logic required to manipulate them. This approach to programming is well-suited for programs that are large, complex and actively updated or maintained. This includes programs for manufacturing and design, as well as mobile applications; for example, OOP can be used for manufacturing system simulation software.</span></p><p style="margin-left:0px;"><span style="color: rgb(108,108,108);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;">The organization of an object-oriented program also makes the method beneficial to collaborative development, where projects are divided into groups. Additional benefits of OOP include code reusability, scalability and efficiency.</span></p><p style="margin-left:0px;"><span style="color: rgb(108,108,108);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;">The first step in OOP is to collect all of the objects a programmer wants to manipulate and identify how they relate to each other -- an exercise known as</span> <a href="https://www.techtarget.com/searchdatamanagement/definition/data-modeling" target="_self"><span style="color: rgb(0,124,173);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;"><ins>data modeling</ins></span></a><span style="color: rgb(108,108,108);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;">.</span></p><p style="margin-left:0px;"><span style="color: rgb(108,108,108);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;">Examples of an object can range from physical entities, such as a human being who is described by properties like name and address, to small computer programs, such as</span> <a href="https://www.techtarget.com/whatis/definition/widget" target="_self"><span style="color: rgb(0,124,173);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;"><ins>widgets</ins></span></a><span style="color: rgb(108,108,108);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;">.</span></p><p style="margin-left:0px;"><span style="color: rgb(108,108,108);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;">Once an object is known, it is labeled with a</span> <a href="https://www.techtarget.com/whatis/definition/class" target="_self"><span style="color: rgb(0,124,173);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;"><ins>class</ins></span></a> <span style="color: rgb(108,108,108);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;">of objects that defines the kind of data it contains and any logic sequences that can manipulate it. Each distinct logic sequence is known as a method. Objects can communicate with well-defined interfaces called messages.</span></p><h3 style="margin-left:0px;"><span style="color: rgb(50,50,50);background-color: rgb(255,255,255);font-size: 20px;font-family: Arial, sans-serif;">What is the structure of object-oriented programming?</span></h3><p style="margin-left:0px;"><span style="color: rgb(108,108,108);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;">The structure, or building blocks, of object-oriented programming include the following:</span></p><ul><li style="margin-left:0px;"><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;"><strong>Classes</strong></span> <span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;">are user-defined data types that act as the blueprint for individual objects, attributes and methods.</span></li><li style="margin-left:0px;"><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;"><strong>Objects</strong></span> <span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;">are instances of a class created with specifically defined data. Objects can correspond to real-world objects or an abstract entity. When class is defined initially, the description is the only object that is defined.</span></li>' +
  '<li style="margin-left:0px;"><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;"><strong>Methods</strong></span> <span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;">are functions that are defined inside a class that describe the behaviors of an object. Each method contained in class definitions starts with a reference to an instance object. Additionally, the subroutines contained in an object are called instance methods. Programmers use methods for reusability or keeping functionality encapsulated inside one object at a time.</span></li>' +
  '<li style="margin-left:0px;"><span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;"><strong>Attributes</strong></span> <span style="color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 18px;font-family: Arial, sans-serif;">are defined in the class template and represent the state of an object. Objects will have data stored in the attributes field. Class attributes belong to the class itself.</span></li></ul>"';

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
    price: 9.9,
    category: courseCategories[1],
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
        content: sampleContent,
        link: '',
        subTopics: [
          {
            id: 1,
            title: 'What is Academic English',
            description: subtopicDescription,
            link: 'MyTLosz6aHA',
            content: sampleContent,
          },
          {
            id: 2,
            title: 'What is Academic Writing',
            description: subtopicDescription,
            link: '',
            content: sampleContent,
          },
          {
            id: 3,
            title: 'Example of Academic writing works',
            description: 'Some description',
            link: '',
            content: sampleContent,
          },
        ],
      },
      {
        id: 2,
        title: 'Tools and Skills required',
        description: 'Some description',
        content: sampleContent,
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
        content: sampleContent,
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
        content: sampleContent,
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
        content: sampleContent,
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
        id: 9,
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
        id: 10,
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
    price: 9.0,
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
    price: 7.0,
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
    price: 25.0,
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
    price: 1.0,
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
    saveCourse: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { deleteCourse, saveCourse, getCourseById } = coursesSlice.actions;

export default coursesSlice.reducer;
