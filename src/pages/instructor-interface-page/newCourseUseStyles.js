import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  stepperSection: {
    marginTop: '20px',
  },
  formSection: {},
  backNextButtonsSections: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  form: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems: 'center',
    width: '100%',
  },
  textField: {
    margin: theme.spacing(2),
  },
  select: {
    margin: theme.spacing(2),
  },
  mainTitle: {
    width: '100%',
    textAlign: 'center',
  },
  editor: {
    margin: theme.spacing(2),
    backgroundColor: 'white',
    minHeight: '300px',
  },
}));
