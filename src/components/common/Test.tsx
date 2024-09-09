import React from 'react';

export const  SomeComponent=()=> {
  throw new Error('Test error');
}

export default SomeComponent;

  // const { user } = useSelector((state: RootState) => state.user)

  // const dispatch: AppDispatch = useDispatch()


  // const fetchData = async () => {
  //   try {
  //     await dispatch(getCompany()).unwrap()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // if (user!==null) {
  //   console.log('indide')
  //   if(user.data.role==='company'){
  //     useEffect(() => {
  //       console.log('use effect called')
  //       fetchData()
  //     }, [user.data.role])

  //   }

  // }