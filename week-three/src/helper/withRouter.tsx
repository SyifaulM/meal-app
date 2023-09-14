import {
    useNavigate
  } from "react-router-dom";
  
  export const withRouter =(Component: any) =>{
    const Wrapper = (props: any) => {
      let navigate = useNavigate();
      return (
        <Component
        navigate={navigate}
        {...props}
        />
      );
    }
  
    return Wrapper;
  }