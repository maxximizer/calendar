window.onload = function() {
        var currentTime = new Date();
        var polishMonths = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj",
            "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik",
            "Listopad", "Grudzień"
        ]
        var polishDays = ["Niedziela", "Poniedziałek", "Wtorek", "Środa",
            "Czwartek", "Piątek", "Sobota"
        ]
        var currentMonth = polishMonths[currentTime.getMonth()];
        var currentDay = polishDays[currentTime.getDay()];

        $("#month").html(currentMonth);
        $("#day").html(currentDay);
        $("#date").html(currentTime.getDate());
        $("#year").html(currentTime.getFullYear());
        $("#title").html("Poniżej będzie Twoja lista zadań!");

        //wstawianie aktualnej daty do kalendarza
        $("input").change(function() {
            var chosen_date = new Date($("input").val());
            currentMonth = polishMonths[chosen_date.getMonth()];
            currentDay = polishDays[chosen_date.getDay()];
            $("#month").html(currentMonth);
            $("#day").html(currentDay);
            $("#date").html(chosen_date.getDate());
            $("#year").html(chosen_date.getFullYear());
        })
         var i = 0;

         //dodanie nowego nowego zadania
        $("#adding").click(function() {
            $("#title").html("Twoja lista zadań:");
            var p = '<p>(najedź myszką na dany dzień, aby sprawdzić co zaplanowałeś)</p>';
            //dodanie przycisku na usuń wszystko
            var a2 = $('<a id="deleteAll">').text("Usuń wszystko");
            $("#title").append(p);
            $("#title").append(a2);
            $("#deleteAll").click(function() {
                $("#list").empty();
            });
            //odczytanie wartości z inputu
            i++;
            var x = $("#set_date");
            var y = $("#plan");

            //dodawanie kolejnych zdarzeń do listy w sposób posortowany
            var newLi = $('<li id="Item' + i + '"">' + x[0].value + " " +
                "</li>").hide();
            $('li', 'ul').add(newLi.fadeIn(800)).sort(sortAlpha).appendTo(
                'ul');

            //skopiowanie kartki kalendarza
            $(".right-side .calendar-day").clone().appendTo('#Item' + i);

            //nadanie kartce kalendarza id
            $('#Item' + i + ' .calendar-day').attr("id", i);

            //utworzenie ukrytej notatki do kalendarza, dostępnej po kliknieciu
            var newDiv = $('<div class="no_display" id="short_notice'+
                i + '">' + y[0].value + '</div>');

            //dodanie notatki do kartki kalendarza
            $('#Item' + i + ' .calendar-day').append(newDiv);

            //niewidoczny text html służący jako zmienna do sortowanie
            $('#Item' + i).append('<br><span class="no_display" >' + y[
                0].value + '</span>');

            //po najechaniu na kalendarz ma pojawić się notatka
            $('#list .calendar-day').mouseover( function(event) {
                var status = $(this).attr('id');
                $('#' + status + ' .full-date').addClass("no_display");
                $('#short_notice' + status).removeClass(
                    "no_display");
            });


            $('#list .calendar-day').mouseout( function(event) {
                var status = $(this).attr('id');
                $('#' + status + ' .full-date').removeClass("no_display");
                $('#short_notice' + status).addClass(
                    "no_display");
            });

        });
       
        //funkcja do sortowania
        function sortAlpha(a, b) {
            return a.innerHTML.toLowerCase() > b.innerHTML.toLowerCase() ?
                1 : -1;
        }
    }
