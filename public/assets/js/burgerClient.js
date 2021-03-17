$(document).on("click", ".burgerButtons", (event) => {
  let id = event.target.dataset.id;
  let devouredState = event.target.dataset.devouredState;

  let newDevouredState = {
    devoured: devouredState,
  };

  $.ajax("/api/burgers/" + id, {
    type: "PUT",
    data: newDevouredState,
  }).then(function () {
    location.reload();
  });
});

$(".create-form").on("submit", (event) => {
  event.preventDefault();

  const newBurger = {
    burger_name: $("#burgerNameInput").val().trim(),
    devoured: $("[name=devoured]:checked").val().trim(),
  };

  $.ajax("/api/burgers", {
    type: "POST",
    data: newBurger,
  }).then(() => {
    location.reload();
  });
});

$(".deleteBurger").on("click", function(event) {
  const id = $(this).data("id");

  $.ajax("/api/burgers/" + id, {
    type: "DELETE",
  }).then(() => {
    location.reload();
  });
});
