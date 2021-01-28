export default function reducer(prevState, action) {
  //console.log("DISPATCH", action.type);

  switch (action.type) {
    default:
      return {
        ...prevState,
        [action.type]: action.data,
      };
  }
}
