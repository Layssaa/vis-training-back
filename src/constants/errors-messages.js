// ---- ERRORS MESSAGES ----
const authErrors = {
  no_token_provided: "No token provided.",
  user_not_found: "User not found",
  incorrect_data: "Incorrect data",
  complete_fields: "All information must be completed",
  diffent_password: "The passwords are different",
  user_already_exist: "User already exists.",
  invalid_token: "Invalid token.",
  expired_token: "expired token",
  try_a_different_password: "Try a different password than the previous one.",
  invalid_filters: "Invalid filters"
};

const systemErros = {
  could_not_find_this_route: "Could not find this route",
  an_error_occurred_while_sending: "An error occurred while sending",
  could_not_find_any_route: "Could not find any route.",
  we_could_not_find_any_workouts: "We couldn't find any workouts with these filters.",
  invalid_modality: "Invalid modality",
  there_are_not_enough_records_to_analyze_the_evolution: "There are not enough records to analyze the evolution"
};

export { authErrors, systemErros };
