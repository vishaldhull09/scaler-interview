import React from "react";
import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";

import $ from "jquery";

export const Interviews = ({ state, participants, getAllInterviews }) => {
  const [edit, setEdit] = useState(false);
  const [value1, onChange1] = useState(new Date());
  const [value2, onChange2] = useState(new Date());

  const updateEntry = (ele, t1, t2) => {
    fetch("http://localhost:4000/api/admin/updateInterview", {
      headers: {
        "Content-type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        _id: ele._id,
        title: "Interview",
        participants: ele.participants,
        startTime: t1,
        endTime: t2,
      }),
    }).then((res) => {
      console.log("updated");
      getAllInterviews();
      return res.json();
    });
  };
  const deleteEntry = (ele) => {
    fetch("http://localhost:4000/api/admin/deleteInterview", {
      headers: {
        "Content-type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        _id: ele._id,
      }),
    }).then((res) => {
      console.log("deletdd", res);
      getAllInterviews();
      return res.json();
    });
  };

  return (
    <div class="container" style={{ marginTop: 70 }}>
      <div class="mb-4">
        <div class="d-flex flex-row justify-content-between">
        <h1>List of Interviews</h1>
        <div>
        <button
          class="btn btn-primary"
          onClick={() => {
            
            setEdit(!edit)
          }}
        >
          Edit
        </button>
        </div>
        </div>
      </div>
      <div>
        {state && (
          <div>
            <div >
              {state.map((x, i) => {

                return (
                  <div class="bg-light mb-4 p-4">
                    <div class="d-flex flex-row justify-content-between">
                      <div>
                      <h4>
                        {x.title} {i + 1}
                        </h4>{" "}
                      </div>
                      {" "}
                      <button
                        class="btn btn-primary"
                        onClick={() => deleteEntry(x)}
                      >
                        Delete
                      </button>
                    </div>
                    
                    {edit && ( 
                      <div>
                        <DateTimePicker
                          class="form-group"
                          onChange={onChange1}
                          value={value1}
                        />{" "}
                        <DateTimePicker
                          class="form-group"
                          onChange={onChange2}
                          value={value2}
                        />{" "}
                        <button
                          class="btn btn-primary"
                          onClick={() => updateEntry(x, value1, value2)}
                        >
                          Update
                        </button>
                      </div>
                    )}

                    <table class="table table-condensed">
                      <tr>
                        <th>start time</th>
                        <th>end time</th>
                        <th>list of participants</th>
                      </tr>
                      <tbody>
                        <tr>
                          <td>{new Date(x.startTime).toLocaleString()}</td>
                          <td>{new Date(x.endTime).toLocaleString()}</td>
                          {participants &&
                            x.participants.map((ele) => {
                              return <td>{participants[ele].name}</td>;
                            })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
