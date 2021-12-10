# interview-management-backend
interview-management-backend

## Installation
 - `git clone https://github.com/vishaldhull09/Interview-manager`
 - `npm i`
 - `nodemon`

## List of APIs
| API Endpoint | Method | Description | Body |
| ------------ | ------ | ----------- | ---- |
| /api/admin/getAllInterviews | GET | Fetches all the interviews scheduled | - |
| /api/admin/scheduleInterview | POST | Adds an interview to database | `{"candidateName": "abc", "candidateEmail": "a@candidate.com", "interviewerEmail": "1@interviewer.com", "startTime": "2014-11-20T04:00:00.000Z", "endTime": "2014-11-20T05:00:00.000Z"}` |
| /api/admin/updateInterview | PUT | Updates an existing interview details | `{_id: "23abfa22dd0aa8789544126e", ...}` |
| /api/admin/deleteInterview | DELETE | Deletes an interview | `{_id: "23abfa22dd0aa8789544126e"}` |
