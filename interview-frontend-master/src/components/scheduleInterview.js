import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";
import {Interviews} from './Interviews';


export const FormComponent = (props) => {

  const [state1, setState1] = useState();
  const [participants, setParticipants] = useState();
  const { handleSubmit } = useForm();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [startTime, onChange] = useState(new Date());
  const [endTime, onChange2] = useState(new Date());
  const [subject,setSubject] = useState("")
  const [formdata, setformdata] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    getAllInterviews();
  }, []);


  useEffect(() => {
    fetch("http://localhost:4000/api/admin/getAllUsers")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
       
        let arr = {};
        res.msg.forEach((x) => {
          arr[x._id] = x;
        });
       
        setParticipants(arr);
      });
  }, []);


 const getAllInterviews = () => {
    fetch("http://localhost:4000/api/admin/getAllInterviews")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setState1(res.msg);
      });
  };

  const handleChange = (options) => {
    setSelectedOptions(options);
  };
  const onChangeHandler = (field) => (e) => {
    setformdata({ ...formdata, [field]: String(e.target.data) });
  };

  const onSubmit = (formData, event) => {
   // console.log("Form Data: ", startTime, endTime);
   // console.log("Selected Options: ", selectedOptions);
    scheduleInterview(startTime, endTime, selectedOptions,subject);
  };

  const [state, setState] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/api/admin/getAllUsers")
      .then((res) => {
        return res.json();
      })
      .then((res) => {

        setState(res.msg);
      });
  }, []);

  // Create an empty object
  let response = [];
  if (state)
    state.forEach((item) => response.push({ value: item, label: item.name }));

  const scheduleInterview = (startTime, endTime, particpants,subject) => {
    let selectedParticipants = [];
    if (particpants)
      particpants.forEach((item) => selectedParticipants.push(item.value._id));

    fetch("http://localhost:4000/api/admin/scheduleInterview", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title : "Interview",
        participants: selectedParticipants,
        startTime: startTime,
        endTime: endTime,
      }),
    }).then((res) => {
      getAllInterviews();
      return res.json();
    }).then((res)=>{
      if(res.success==false)
      alert(res.msg);
    });
  };

  return (
    <div>
    <div class="container" style={{ marginTop: 70 }}>
      <form class="container" onSubmit={handleSubmit(onSubmit)}>
        <h2>Schedule Interviews</h2>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="first">Select Participants</label>
              <Select
                class="form-group"
                isMulti={true}
                options={response}
                closeMenuOnSelect={false}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="company">Start Date  </label>
              <DateTimePicker
                class="form-group"
                onChange={onChange}
                value={startTime}
              />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label for="phone">End date  </label>
              <DateTimePicker
                class="form-group"
                onChange={onChange2}
                value={endTime}
              />
            </div>
          </div>
{/* 
          <br />
          <br />
          <div class="col-md-6">
            <div class="form-group">
              <label>Subject </label>
              <input type="text" onChange={setSubject} value={subject}></input>
            </div>
          </div>
          */}
        </div>

        {/* <DateTimePickerComponent id="datetimepicker" onChange={onChangeHandler('startDate')} /> */}

        <br />
        <button class="btn btn-primary" type="submit">
          Schedule
        </button>
      </form>
    </div>
      <Interviews state={state1} participants={participants} getAllInterviews={getAllInterviews}/>
     </div>
  );
};
