export const getColorForCategoryBanner = (category) => {
  let colorCode = '';

  switch (category) {
    case 'Tech Tools':
      colorCode = '#EEEBD0';
      break;
    case 'Assignment':
      colorCode = '#56CBF9';
      break;
    case 'Agriculture':
      colorCode = '#FFFFFF';
      break;
    case 'Programming':
      colorCode = '#ECA400';
      break;
    case 'IT':
      colorCode = '#EE2677';
      break;
    case 'Mathematics':
      colorCode = '#5DB7DE';
      break;
    case 'Chemistry':
      colorCode = '#F1E9DB';
      break;
    case 'Biology':
      colorCode = '#A39B8B';
      break;
    case 'Computer Hardware':
      colorCode = '#716A5C';
      break;
    case 'AI':
      colorCode = '#FEEA00';
      break;
    case 'Music':
      colorCode = '#FEFADC';
      break;
    case 'UI/UX':
      colorCode = '#F6D4BA';
      break;
    case 'Business':
      colorCode = '#F3B391';
      break;
    case 'Content Creation':
      colorCode = '#D5E68D';
      break;
    case 'DevOps':
      colorCode = '#89FC00';
      break;
    default:
      colorCode = '#FFD25A';
      break;
  }
  return colorCode;
};
