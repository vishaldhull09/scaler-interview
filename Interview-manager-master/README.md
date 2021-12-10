# interview-management-backend
interview-management-backend


## List of APIs
| API Endpoint | Method | Description | Body |
| ------------ | ------ | ----------- | ---- |
| /api/admin/getAllInterviews | GET | Fetches all the interviews scheduled | - |
| /api/admin/getUser/:id | GET | Fetches details of user via `id` passed as parameter | - |
| /api/admin/getAllUsers | GET | Fetches details of users | - |
| /api/admin/addUser | POST | Inserts the details of users to database | `{ "name": "abc", "email": "j@netanmangal.me" }` |
| /api/admin/scheduleInterview | POST | Adds an interview to database | `{ "title": "Web Dev Interview #1, "startTime": "2014-11-20T05:00:00.000Z", "endTime":    "2014-11-20T06:00:00.000Z", "participants": ["23abfa22dd0aa8789544126a", "23abfa22dd0aa8789544126b", "23abfa22dd0aa8789544126c", "23abfa22dd0aa8789544126d"]" }` |
| /api/admin/updateInterview | PUT | Updates an existing interview details | `{_id: "84abfa22dd0aa8789544126e", ...}` |
| /api/admin/deleteInterview | DELETE | Deletes an interview | `{_id: "84abfa22dd0aa8789544126e"}` |