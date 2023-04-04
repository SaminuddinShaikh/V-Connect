import React from "react";

import Loading from "./Loading";
import Toast from "./Toast";

import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Alert = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      {alert.loading && <Loading />}
      {alert.error && <Toast msg={alert.error} handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })} bgColor="bg-danger" />}
      {alert.success && (
        <Toast msg={alert.success} handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })} bgColor="bg-success" />
      )}
    </div>
  );
};

export default Alert;
