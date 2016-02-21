document.addEventListener("DOMContentLoaded", function() {
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
    var month = document.getElementById("month");
    var day = document.getElementById("day");
    var date = document.getElementById("date");
    var year = document.getElementById("year");
    var title = document.getElementById("title");
    month.innerHTML = currentMonth;
    day.innerHTML = currentDay;
    date.innerHTML = currentTime.getDate();
    year.innerHTML = currentTime.getFullYear();
    title.innerHTML = "Poniżej będzie Twoja lista zadań!";
    //wstawianie aktualnej daty do kalendarza
    document.querySelector("input").addEventListener('change', function() {
        var chosen_date = new Date(document.querySelector(
            "input").value);
        currentMonth = polishMonths[chosen_date.getMonth()];
        currentDay = polishDays[chosen_date.getDay()];
        month.innerHTML = currentMonth;
        day.innerHTML = currentDay;
        date.innerHTML = chosen_date.getDate();
        year.innerHTML = chosen_date.getFullYear();
    })
    var i = 0;
    //dodanie nowego zadania
    document.getElementById("adding").addEventListener('click',
        function() {
            title.innerHTML = "Twoja lista zadań:";
            var p = document.createElement('p');
            p.innerHTML =
                "(najedź myszką na dany dzień, aby sprawdzić co zaplanowałeś)";

            //dodanie przycisku na usuń wszystko
            var a2 = document.createElement('a');
            a2.innerHTML = 'Usuń wszystko';
            a2.setAttribute("id", "deleteAll");
            title.appendChild(p);
            title.appendChild(a2);
            document.getElementById("deleteAll").addEventListener(
                'click', function() {
                    var myNode = document.getElementById("list")
                    myNode.innerHTML = '';
                });
            i++;

            //odczytanie inputu
            var x = document.getElementById("set_date").value;
            var y = document.getElementById("plan").value;

            //dodawanie kolejnych zdarzeń do listy w sposób posortowany
            var newLi = document.createElement('li');
            newLi.setAttribute("id", "Item" + i);
            newLi.innerHTML = x;
            document.querySelector("ul").appendChild(newLi);

            //skopiowanie kartki kalendarza
            var myDiv = document.getElementById("test");
            var divClone = myDiv.cloneNode(true);
            divClone.removeAttribute("id", "test");
            divClone.setAttribute("id", i)
            document.getElementById('Item' + i).appendChild(
                divClone);

            //utworzenie ukrytej notatki do kalendarza, dostępnej po najechaniu myszka
            var newDiv = document.createElement('div');
            newDiv.classList.add("no_display");
            newDiv.setAttribute("id", "short_notice" + i);
            newDiv.innerHTML = y;

            //dodanie notatki do kartki kalendarza
            document.getElementById(i).appendChild(newDiv);

            //niewidoczny text html służący jako zmienna do sortowania
            var newSpan = document.createElement('span');
            newSpan.classList.add("no_display");
            newSpan.innerHTML = y;
            document.getElementById('Item' + i).appendChild(newSpan);
            
            //po najechaniu na kalendarz ma pojawić się notatka
            $('#list .calendar-day').mouseover(function(event) {
                var status = this.getAttribute('id');
                var targetDiv = document.getElementById(
                    status).getElementsByClassName(
                    "full-date")[0];
                targetDiv.classList.add("no_display");
                document.getElementById('short_notice' +
                    status).classList.remove(
                    "no_display");
            });
            $('#list .calendar-day').mouseout(function(event) {
                var status = this.getAttribute('id');
                var targetDiv = document.getElementById(
                    status).getElementsByClassName(
                    "full-date")[0];
                targetDiv.classList.remove("no_display");
                document.getElementById('short_notice' +
                    status).classList.add("no_display");
            });
        });
})