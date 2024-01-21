const viewConversionDetails = function (jobId) {
  $("#selected_task_id").val(jobId).triggerHandler("change");
};

const CompletedTasksDatatable = (function () {
  const recordName = function (basename, type, { task_success } = row) {
    if (task_success) {
      return `<div class="q-badge success" role="alert">✔</div> ${basename}`;
    }

    return `<div class="q-badge failed" role="alert">✖</div> ${basename}`;
  };

  const buildTable = function () {
    const table = $("#history_completed_tasks_table").DataTable({
      processing: true,
      serverSide: true,
      ajax: {
        url: "list/", // ajax source
        type: "GET", // request type
        data: function (data) {
          return {
            data: JSON.stringify(data),
          };
        },
      },
      columnDefs: [
        {
          targets: 0,
          title: "New File Name",
          className: "basename",
          name: "basename",
          data: "basename",
          render: recordName,
        },
        {
          targets: 1,
          className: "start_time",
          title: "Start Time",
          name: "start_time",
          data: "start_time",
        },
        {
          targets: 2,
          title: "Finish Time",
          name: "finish_time",
          data: "finish_time",
        },
      ],
      lengthMenu: [
        [7, 10, 15, 20, 50, 100, 500],
        [7, 10, 15, 20, 50, 100, 500], // change per page values here
      ],
      pageLength: 15, // default record count per page
      order: [[2, "desc"]],
    });

    table.on("click", "tbody tr", function () {
      const data = table.row(this).data();

      viewConversionDetails(data.id);
    });
  };

  return {
    //main function to initiate the module
    init: function () {
      buildTable();
    },
  };
})();
