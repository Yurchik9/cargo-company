# React App Enhancement: Form Refactoring & Page Merging

## Context
Please help me refactor and improve specific parts of my React frontend application. The main focus is on enhancing the UX of the order/booking form and fixing the UI/UX of the Pricing and Services pages. Use the existing styling framework (e.g., Tailwind CSS, Material UI, or React-Bootstrap).

## Task 1: Smart Order Form Pre-filling (Contextual Routing)
The order form must dynamically pre-fill its fields based on the page the user navigated from. Please implement the logic (using React Router's `useLocation` state or URL parameters) for the following scenarios:
1. **Navigation from a Category/Car Page:**
   - Pre-fill the `Category` field.
   - Pre-fill the `Car` model field.
   - Automatically insert relevant default text into the `Comments/Description` field based on the selected category.
2. **Navigation from the Calculator:**
   - Capture all selected options/parameters from the calculator state and pre-fill the corresponding fields in the order form.

## Task 2: Form UI/UX Improvements
Upgrade the inputs within the form for a better user experience:
1. **International Phone Input:** Replace the standard text input with a proper phone number input that includes a country code dropdown (e.g., using `react-phone-number-input` or a similar robust solution).
2. **Date & Time Pickers:** Implement user-friendly, native-feeling Date and Time pickers instead of basic text inputs.
3. **State & Validation:** Ensure these new inputs are properly connected to the form state management and validation schema (e.g., Formik + Yup, or React Hook Form).

## Task 3: Redesign and Merge "Pricing" & "Services"
Currently, the "Pricing" page has a poor UI and overlaps heavily with the "Services" tab.
1. **Merge Components:** Combine the "Pricing" and "Services" pages into one cohesive, modern component.
2. **UI Overhaul:** Rethink the design. Use visually appealing pricing cards, grid layouts, or accordions that clearly explain the service and its cost simultaneously.
3. **Integration:** Add clear "Order Now" buttons to each service/price card that route the user to the Order Form, passing the relevant service details via route state (as required in Task 1).

## Output Requirements
- Provide the updated code for the Form component.
- Provide the code for the newly merged Services & Pricing page.
- Show the routing logic (how `useNavigate` and `useLocation` are used to pass the state).
- List any new npm packages that need to be installed.
