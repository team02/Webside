/*Velger å bruke jQuery framfor javascript, grunnet av at jQuery utfører de
samme oppgavene med mindre kode. Et resultat av dette er for eksempel at booking-siden
laster inn raskere.*/
//Datepicker slik at bruker kan velge dato for ankomst og avreise.
//Bruker dateformat slik at datoen vil bli vist som dag/månde/år.
$(document).ready(function(){
  $('.datovelger').each(function(){
      $(this).datepicker({dateFormat : 'dd/mm/yy', minDate: 0, maxDate: 14}); /*Endrer formatet slik at input viser dag først.
    Setter minDate til 0 slik at brukeren ikke kan velge tidligere datoer og maxdate 14 slik at brukeren maks kan velge opphold for 2 uker*/
  });

    /*Variabler som omfatter det generelle utseende*/
    var boks = $('#boks'); /*Variabel for første boks*/
    var boks2 = $('#boks2'); /*Variabel for andre boks*/
    var boks3 = $('#boks3'); /*Variabel for tredje boks*/
    var sekund = 1000; /*Variabel som gjør det enklere å regne i sekunder.*/
    var teller = 0; /*Teller som skal telle hvor mange ganger knappen er blitt trykket.*/


    /*Tilbakeknapp*/
    $('#tilbake').click(function(){

      /*Deaktiver knapp i 1 sekund slik at brukeren ikke kan hoppe over neste skjema.*/
      /*NOTAT: ved at brukeren hopper tilbake før forrige skjema lastes, vil ikke skjemaet vises ved ny innlastning.*/
      $('#tilbake').attr('disabled', 'disabled');
      setTimeout(function(){ /*Fjerner deaktiveringen etter 1 sekund*/
        $('#tilbake').removeAttr('disabled');
        }, sekund);

      /*Ser hvor brukeren er i skjemaet slik at tilbakeknappen går tilbake på riktig plass*/
      if (teller === 1){ /*Animerer tilbake til første felt*/
        $(boks2).stop().animate({top: '-600px'}, sekund);
        $('#tilbake').stop().animate({top: '-1610px'}, sekund);
        $(boks).stop().animate({left: '0px'}, sekund);
        teller -= 1;
      } else if (teller === 3) { /*Animerer tilbake til andre felt*/
        $(boks2).stop().animate({left: '0px'}, sekund);
        $(boks3).stop().animate({top: '-1200px'}, sekund);
        teller -= 2;
      } else if (teller === 5){ /*Animerer tilbake til tredje felt*/
        $('#bekreft').stop().animate({top: '0px'}, sekund)
        $(boks3).stop().animate({left: '0px'}, sekund);
        teller -= 2;
        $('.knapp').html('Videre');
      }
    });

    /*Setter antall timer som disabled og setter abled om brukeren skal leie for mindre enn ett døgn*/
    $('#timer').prop('disabled', true);
    $('#timer').css('background-color', 'gray');

    /*Funksjon som ser om betalingsmåte blir endret */
    $('#betalingsmaate').change(function(){ /*Funksjon som ser om brukeren endrer betalingsmåte*/
        if ($(this).val() === 'Visa'){ /*Om visa er valgt*/

          $('#faktura').prop('disabled', true); /*Deaktiver faktura-input*/
          $('#faktura').css('background-color', 'gray'); /*Setter bakgrunnen til grå slik at brukeren kan se at feltet ikke virker*/
          $('#kontonummer').prop('disabled', false); /*Aktiver visa input*/
          $('#kontonummer').css('background-color', 'white'); /*Stiller tilbake farge om nødvedig*/

        } else if($(this).val() === 'faktura'){ /*Om faktura er valgt*/

          $('#kontonummer').prop('disabled', true); /*Deaktiver visa-input*/
          $('#kontonummer').css('background-color', 'gray'); /*Setter bakgrunn til visa til grå*/
          $('#faktura').prop('disabled', false); /*Aktiver faktura-input*/
          $('#faktura').css('background-color', 'white'); /*Stiller tilbake feltet om nødvendig*/
        }

    }); /*Slutten på onchange funksjon*/


    /*Bruker samme knapp for alle validasjonene*/
    $('.knapp').click(function(){

      var hytteValgt = $('#hytteValgt option:selected').val(); /*Finner hvilken hytte brukeren har valgt*/
      var innDato = $('#innDato').val(); /*Verdi for innsjekkingsdato*/
      var utDato = $('#utDato').val(); /*Verdi for utsjekkingsdato*/

      /*Konverterer new Date slik at verdiene for datoen i dag
      blir satt til en lik verdi for innskrivningsfeltene.
      Ved å gjøre dette kan datoene sammenlignes for validering.*/
      var dagensDato = new Date(); /*Dagens dato*/
      var dd = dagensDato.getDate(); /*Finnes dag for dagensDato*/
      var mm = dagensDato.getMonth() + 1; /*Finner månde for dagensDato. Plusser på 1 fordi Januar har verdien 0*/
      var yyyy = dagensDato.getFullYear(); /*Finner årstall for dagensDato*/
      dagensDato = dd+'/'+mm+'/'+yyyy; /*Legger inn alle verdiene i den rekkefølgen input'ene for dato har*/

      /*Validering av hyttevalg*/
      if (hytteValgt === 'ingenValgt') { /*Om ingen hytte er valgt*/
        alert('Vennligst velg ei hytte!'); /*Vis feilmelding*/
        $('#hytteValgt').focus(); /*Fokuserer rundt drop-down menyen.*/
      } else if (innDato === ''){ /*Om ingen innsjekkingsdato er valgt*/
        alert('Vennligst angi innsjekkingsdato!'); /*Skriv ut melding*/
        $('#innDato').focus(); /*Fokuser input-felt*/
      } else if (utDato === ''){ /*Om ingen utsjekkingsdato er valgt*/
        alert('Vennligst angi utsjekkingsdato!'); /*Skriv ut melding*/
        utDato('#utDato').focus(); /*Fokuser input-felt*/
      } else if (Date.parse(utDato) < Date.parse(innDato)){ /*Om utsjekkingsdato er mindre enn innsjekkingsdato. Bruker date.parse slik at alle 3 verdiene blir sammenlignet.*/
        alert('Du kan ikke sjekke inn eller ut på en ugyldig dato!'); /*Feilmelding*/
      } else if($('#timer').prop('disabled') == true && innDato === utDato){ /*Om felt for timer er disabled og innsjekkingsdato er lik utsjekkingsdato*/
        alert('Vennligst fyll inn hvor mange timer hytten skal leies'); /*Feilmelding*/
        $('#timer').prop('disabled', false); /*Fjerner disable*/
        $('#timer').css('opacity', 1); /*Endrer opacity*/
        $('#timer').css('background-color', 'white'); /*Endrer bakgrunn for tekstfelt til hvit*/
      } else if($('#timer').prop('disabled') == false && innDato === utDato && $('#timer').val() > 6){ /*Sjekker om felt for timer er diabled, om innsjekkingsdato er lik utsjekkingsdato og om timer er over 6 timer*/
        alert('Om du skal leie en hytte i mer enn 6 timer må du leie for et helt døgn');/*Feilmelding*/
      } else {

        /*Deaktiver knapp i 2 sekunder slik at brukeren ikke kan hoppe over neste skjema.*/
        $('.knapp').attr('disabled', 'disabled');
        setTimeout(function(){ /*Fjerner deaktiveringen etter 2 sekunder*/
          $('.knapp').removeAttr('disabled');
          }, sekund);

        /*Bruker .stop() slik at animasjonene begynner umiddelbart.
        Om stop() ikke brukes, vil animasjonene vente i 1-2 sekunder
        og de vil kollidere.*/
        /*Rull videre til neste validering*/
        $(boks).stop().animate({left: '800px'}, sekund);
        $(boks2).stop().animate({top: '-150px'}, sekund);
        $('#tilbake').stop().animate({top: '-1500px'}, sekund); /*Tilbakeknapp*/

        teller += 1;

      }

      /*Andre valideringsskjema*/
      if (teller === 2){ /*Om telleren har verdi 1*/
        var fulltNavn = $('#fulltNavn').val(); /*Variabel for fullt navn*/
        var telefonnummer = $('#telefon').val(); /*Variabel for telefonnummer*/
        var antPers = $('#antPers').val(); /*Variabel for antall personer*/
        var email = $('#email').val(); /*Variabel for epost*/

        /*Funksjon for å se om e-posten er gyldig*/
        function validerEpost(email){
          var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/; /*Tillatte uttrykk i epost adressen*/
          if (filter.test(email)){ /*Om eposten er godkjent*/
            return true; /*Returner sant*/
          } else { /*Om kravene ikke er oppfyllt*/
            return false; /*Returner usant*/
          }/*slutt på if-setning*/
        } /*funksjon setning*/

        /*Validering*/
        if (fulltNavn == ''){ /*Om fullt navn står tomt*/
          alert('Vennligst fyll inn ditt hele navn!'); /*Feilmelding*/
          teller -= 1; /*Trekker i fra telleren slik at valideringen fortsetter*/
        } else if (telefonnummer == '' || telefonnummer.length > 8 || telefonnummer.length < 8){ /*Om telefonnummeret er tomt eller lengden er lengere enn 8 tall*/
          alert('Sjekk at du har skrevet inn riktig telefonnummer!'); /*Feilmelding*/
          teller -= 1; /*Trekker i fra*/
          $('#telefon').focus(); /*Setter fokus på input-felt*/
        } else if (antPers == ''){ /*Om antPers felt er tomt*/
          alert('Vennlist oppgi hvor mange personer dere er.') /*Feilmelding*/
          teller -= 1; /*Trekk i fra teller*/
          $('#antPers').focus(); /*Fokuser på feltet*/
        } else if (validerEpost(email) == false){ /*Om email står tomt*/
          alert('Sjekk at du har skrevet inn en gylidg epost'); /*Feilmelding*/
          teller -= 1; /*Trekker i fra teller*/
          $('#email').focus(); /*Fokuserer feltet*/
        } else {

          /*Bruker .stop() slik at animasjonene begynner umiddelbart.
          Om stop() ikke brukes, vil animasjonene vente i 1-2 sekunder
          og de vil kollidere.*/
          $(boks2).stop().animate({left: '900px'}, sekund);
          $(boks3).stop().animate({top: '-550px'}, sekund);


          /*Deaktiverer knappen*/
          $('.knapp').attr('disabled', 'disabled');
          setTimeout(function(){ /*Fjerner deaktiveringen etter 2 sekunder*/
            $('.knapp').removeAttr('disabled');
          }, sekund);

          teller += 1; /*Plusser på teller*/
        } /*siste else*/
      } /*If teller == 2*/

      if (teller === 4){ /*Om teller har verdi 2*/

        var kontonummer = $('#kontonummer').val(); /*Variabel for kontonummer*/
        var faktura = $('#faktura').val(); /*Variabel for faktura*/
        var betalingsmaate = $('#betalingsmaate option:selected').val();
        var valgt1 = $('input[name=gruppe1]:checked' , '#medlem').val();
        var valgt2 = $('input[name=gruppe2]:checked' , '#oppvarming').val();
        var valgt3 = $('input[name=gruppe3]:checked' , '#vasking').val();

        if(betalingsmaate === 'ingenValgt'){
          alert('Vennligst velg en betalingsmåte');
          teller -= 1;
        } else if($('#faktura').prop('disabled') == true && kontonummer === '' && kontonummer < 11){
          $('#faktura').val(''); /*Fjerner innhold i faktura-felt. Dette er grunnet av at brukeren kan fylle ut en input, men innholdet blir ikke fjernet om bruker velger et annet valg*/
          alert('Vennligst sjekk at du har skrevet inn et gyldig kontonummer');
          teller -= 1;
        } else if($('#kontonummer').prop('disabled') == true && faktura === ''){
          $('#kontonummer').val(''); /*Fjerner innhold*/
          alert('Vennligst fyll inn faktura-feltet');
          teller -= 1;
        } else if(!valgt1){
          alert('Vennligst angi om du er medlem eller ikke');
          teller -= 1;
        } else if (!valgt2){
          alert('Vennligst angi om du ønsker oppvarmet hytte eller ikke');
          teller -= 1;
        } else if (!valgt3){
          alert('Vennligst angi om du ønsker vasking av hytta eller ikke');
          teller -= 1;
        } else { /*Om alle krav er godkjent*/
          teller += 1; /*Legger på teller*/
          $(boks3).stop().animate({left: '1000px'}, sekund); /*Animerer skjema ut av skjermen*/
          $('.knapp').html('Bekreft bestilling');
          $('#bekreft').stop().animate({top: '-1080px'}, sekund); /*Animerer ned oppsummering av bestilling*/

          /*Variabler for de ulike elementene som skal implementeres i sluttskjema*/
          var navn = $('#fulltNavn').val();
          var timer = $('#timer').val();
          var typHytte = $('#hytteValgt').val();
          var persAnt = $('#antPers').val();
          var medlem = $('input[name=gruppe1]:checked' , '#medlem').val();
          var oppvarming = $('input[name=gruppe2]:checked' , '#oppvarming').val();
          var vasking = $('input[name=gruppe3]:checked' , '#vasking').val();
          var totalPris = 0;

          var innsjekk = $('#innDato').datepicker('getDate'); /*Henter tiden for innsjekkingen*/
          var utsjekk = $('#utDato').datepicker('getDate'); /*Henter tiden for utsjekkingen*/
          var enDag = 24*60*60*1000; /*Variabel for hvor lang en dag er i millisekunder*/
          var diff = 0; /*Utgangspunktet for differansen*/

          /*Regner ut differansen mellom dagene*/
          diff = Math.round(Math.abs((utsjekk.getTime() - innsjekk.getTime())/(enDag)));



          /*If-setning som bestemmer totalpris i forhold til hvilken hytte som er valgt*/
          if (typHytte == 'Tømmerhytta (1699 kr pr.natt)'){
            totalPris += 1699 * diff;
          } else if (typHytte == 'Fjellparadiset'){
            totalPris += 2799 * diff;
          } else if (typHytte == 'Sjøperla'){
            totalPris += 1500 * diff;
          } else {
            totalPris += 1250 * diff;
          }

          /*If-setning som bestemmer totalpris i forhold til vasking og oppvarming*/
          if (vasking == 'Ønsker vasking av hytte (500 kr)') {
            totalPris += 500;
          }

          if (oppvarming == 'Ønsker oppvarmet hytte (500 kr)'){
            totalPris += 500;
          }

          /*If-setning som bestemmer totalpris i forhold til medlemskap*/
          if (medlem == 'er medlem, og gis derfor 15 % rabatt'){
            totalPris = Math.round((totalPris*0.85));
          }

          /*Viser bruker hva han/hun har bestilt*/
          $('#bestilt').html(


            'Hei ' + navn + '! Du er i ferd med å leie ' + typHytte + ' som du leier fra den ' + innDato + ' til den ' + utDato + ' for ' + persAnt + ' personer.'
            + '<br><br> Du har i tillegg valgt:<br><br>'
            + oppvarming + '<br>'
            + vasking + '<br>'
            + 'Du ' + medlem + '<br><br>'
            + 'Totalprisen for hytteleie: ' + totalPris + ' kr'

          );

        } /*Slutt på else-setning*/
      } /*Slutten av if teller === 4*/

      if (teller === 6) /*Om teller når 6 (når brukeren trykker på bekreft)*/
      {
        window.location.replace('kvittering.html'); /*Åpne siden for kvittering*/
      }
    }); /*Klikk-funksjon*/
    console.log($('#timer').val());
  }); /*Document.ready*/
