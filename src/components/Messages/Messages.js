import toastr from 'toastr'

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

export function showSuccessMessage(message, messageTitle = "Sucess!") {
    toastr["success"](message, messageTitle);
};

export function showWarningMessage(message, messageTitle = "Warning!") {
    toastr["warning"](message, messageTitle);
};

export function showErrorMessage(message, messageTitle = "Error!") {
    toastr["error"](message, messageTitle);
};