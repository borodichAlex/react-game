import {IField} from '../../../types';

// start left top triangle 1 - 24
const maxSizeField = 24;
const minSizeField = 1;

export const generateBoard = (arrFields: IField[]): IField[] => {
  const res = [];

  for (let i = minSizeField; i <= maxSizeField; i++) {

    let indexField = arrFields && arrFields.findIndex((field) => field.id === i);
    // if (arrFields) {
    //   const indexField = arrFields.findIndex((field) => field.id === i);

    if (indexField !== -1) {
      res.push(arrFields[indexField]);
    } else {
      const field: IField = {id: i, occupy: null, pieces: []};
      res.push(field);
    }

  }

  return res;
}