# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Add custom ID field to the Agent model and database table

- Description: Update the Agent model to include a new optional field called 'custom_id' that will store the custom ID provided by the Facility for each Agent they work with. Update the database schema accordingly. The custom ID should be nullable. The custom ID should have the uniqueness constraints just like agent's id.
- Acceptance Criteria:
  1. The Agent model has a new field called 'custom_id' which can store a string value with the uniqueness constraint.
  2. The database table for Agents has a new column called 'custom_id' which can store a string value.
- Time/effort estimate: 4 hours
- Implementation Details:
  1. Update the Agent model in the codebase to include the 'custom_id' field with string type and constraints.
  2. Update the database schema to add the 'custom_id' column to the Agents table with the same data type and constraints as in the model.
  3. Create and run a migration script to apply the database changes without affecting existing data.

### Ticket 2: Implement API endpoint for Facilities to save custom Agent IDs

- Description: Create a new API endpoint that allows Facilities to associate a custom ID with an Agent.
- Acceptance Criteria:
  1. Facilities can submit a custom ID for an Agent through the API endpoint.
  2. The custom ID is saved in the Agent model in the 'custom_id' field.
- Time/effort estimate: 6 hours
- Implementation Details:
  1. Define the API endpoint (e.g., PUT /agents/{agent_id}/custom-id) and the request payload structure (e.g., { "custom_id": "example" }).
  2. Implement a controller method that handles the API request, extracting the custom ID from the payload and updating the 'custom_id' field of the Agent with the specified agent_id.
  3. Validate the custom ID input to ensure it meets any required format (e.g., alphanumeric) or uniqueness constraints.
  4. Create unit and integration tests to verify the functionality of the API endpoint.

### Ticket 3: Update getShiftsByFacility function to include custom Agent IDs

- Description: Modify the getShiftsByFacility function to include the custom ID of each Agent in the returned Shift data.
- Acceptance Criteria:
  1. The getShiftsByFacility function returns the custom ID for each Agent assigned to a Shift.
  2. If no custom ID is available for an Agent, the function should return a placeholder value or the Agent's internal database ID.
- Time/effort estimate: 4 hours
- Implementation Details:
  1. Update the SQL query or ORM query in the getShiftsByFacility function to include the 'custom_id' field from the Agents table.
  2. Modify the function to return the custom ID or a fallback value (e.g., "N/A" or internal ID) for each Agent in the Shift data.
  3. Update any affected test cases to reflect the new custom ID data in the Shifts returned by the function.

### Ticket 4: Modify generateReport function to use custom Agent IDs

- Description: Update the generateReport function to display custom Agent IDs instead of internal database IDs in the generated PDF report.
- Acceptance Criteria:
  1. The generated PDF report displays the custom ID for each Agent.
  2. If no custom ID is available for an Agent, the report should display a placeholder value or the Agent's internal database ID.
- Time/effort estimate: 4 hours
- Implementation Details:
  1. Update the generateReport function to use the custom ID data provided by the getShiftsByFacility function when rendering the PDF report.
  2. Ensure the report displays the custom ID or a fallback value (e.g., "N/A" or internal ID) for each Agent in the list of Shifts.
  3. Test the generateReport function with various combinations of custom IDs and internal IDs to ensure the report displays the correct information.

### Ticket 5: Update documentation and notify clients

- Description: Update API documentation and any relevant user guides to reflect the new custom ID functionality. Notify clients of the new feature and provide them with necessary resources to start using it.
- Acceptance Criteria:
  1. API documentation and user guides are updated with the new custom ID feature.
  2. Clients are informed about the new feature and provided with resources to use it.
- Time/effort estimate: 2 hours
- Implementation Details:
  1. Update the API documentation to include the new endpoint for associating custom IDs with Agents, specifying the request method, endpoint URL, payload structure, and any relevant constraints.
  2. Update any user guides or tutorials to include instructions on how to use the new custom ID feature, explaining the benefits of using custom IDs and providing examples of how to associate custom IDs with Agents and generate reports with custom IDs.
  3. Create a communication plan to notify clients about the new feature via email, blog posts, or other channels, ensuring a clear message and timely delivery.
  4. Provide clients with links to the updated documentation and any support resources they may need to start using the custom ID feature, such as a dedicated support email or phone line for any questions or issues they may encounter.
