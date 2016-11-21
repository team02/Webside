/*Velger å bruke jQuery framfor javascript, grunnet av at jQuery utfører de
samme oppgavene med mindre kode. Et resultat av dette er for eksempel at booking-siden
laster inn raskere.*/
//Datepicker slik at bruker kan velge dato for ankomst og avreise.
//Bruker dateformat slik at datoen vil bli vist som dag/månde/år.
$(document).ready(function(){
  $('.datovelger').each(function(){
      $(this).datepicker({dateFormat : 'dd/mm/yy', minDate: 0}); /*Endrer formatet slik at input viser dag først.
                                                                  Setter minDate til 0 slik at brukeren ikke kan velge tidligere datoer*/
  });

    /*Setter rosa farge rundt knappen ved fokus.
    Dette er for bedre estetikk*/
    $('.knapp').focus(function(){
    $(this).css('outline-color', '#ffb3b3');
    });

    /*Variabler som omfatter det generelle utseende*/
    var boks = $('#boks'); /*Variabel for første boks*/
    var boks2 = $('#boks2'); /*Variabel for andre boks*/
    var boks3 = $('#boks3'); /*Variabel for tredje boks*/
    var sekund = 1000; /*Variabel som gjør det enklere å regne i sekunder.*/
    var teller = 0; /*Teller som skal telle hvor mange ganger knapp er blitt trykket.*/

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
      var yy = dagensDato.getYear(); /*Finner årstall for dagensDato*/
      dagensDato = dd+'/'+mm+'/'+yy; /*Legger inn alle verdiene i den rekkefølgen input'ene for dato har*/

      if (hytteValgt === 'ingenValgt') { /*Om ingen hytte er valgt*/
        alert('Vennligst velg ei hytte!'); /*Vis feilmelding*/
        $('#hytteValgt').focus(); /*Fokuserer rundt drop-down menyen.*/
      } else if (innDato === ''){ /*Om ingen innsjekkingsdato er valgt*/
        alert('Vennligst angi innsjekkingsdato!'); /*Skriv ut melding*/
        $('#innDato').focus(); /*Fokuser input-felt*/
      } else if (utDato === ''){ /*Om ingen utsjekkingsdato er valgt*/
        alert('Vennligst angi utsjekkingsdato!'); /*Skriv ut melding*/
        utDato('#utDato').focus(); /*Fokuser input-felt*/
      } else if (innDato < dagensDato || utDato < dagensDato || utDato < innDato){
        alert('Du kan ikke sjekke inn eller ut på en ugyldig dato!');
      } else { /*Om alle kravene for utfylling er godkjent*/

        /*Deaktiver knapp i 2 sekunder slik at brukeren ikke kan hoppe over neste skjema.*/
        $('.knapp').attr('disabled', 'disabled');
        setTimeout(function(){ /*Fjerner deaktiveringen etter 2 sekunder*/
          $('.knapp').removeAttr('disabled');
          }, sekund*2);

        /*Bruker .stop() slik at animasjonene begynner umiddelbart.
        Om stop() ikke brukes, vil animasjonene vente i 1-2 sekunder
        og de vil kollidere.*/
        /*Rull videre til neste validering*/
        $(boks).stop().animate({left: '100%'}, sekund);
        $(boks2).stop().animate({top: '-150px'}, sekund);

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
          $(boks2).stop().animate({left: '100%'}, sekund);
          $(boks3).stop().animate({top: '-400px'}, sekund);
          $('.knapp').html('Bekreft bestilling');

          /*Deaktiverer knappen*/
          $('.knapp').attr('disabled', 'disabled');
          setTimeout(function(){ /*Fjerner deaktiveringen etter 2 sekunder*/
            $('.knapp').removeAttr('disabled');
          }, sekund*2);

          teller += 1; /*Plusser på teller*/
        } /*siste else*/
      } /*If teller == 2*/

      if (teller === 3){
        var kontonummer = $('#kontonummer').val(); /*Variabel for kontonummer*/
        var faktura = $('#faktura').val(); /*Variabel for faktura*/
        var betalingsmaate = $('#betalingsmaate').val();

        $('#betalingsmaate').change(function(){ /*Funksjon som ser om brukeren endrer betalingsmåte*/
            if ($(this).val() === 'Visa'){ /*Om visa er valgt*/
              $('#faktura').prop('disabled', true); /*Deaktiver faktura-input*/
              $('#kontonummer').prop('disabled', false); /*Aktiver visa input*/
            } else if($(this).val() === 'faktura'){ /*Om faktura er valgt*/
              $('#kontonummer').prop('disabled', true); /*Deaktiver visa-input*/
              $('#faktura').prop('disabled', false); /*Aktiver faktura-input*/
            }

            if (betalingsmaate == ''){
              alert('Vennligst velg en betalingsmåte!');
              teller -= 1;
            }

        });


      } /*Slutten av if teller = 3*/


    }); /*Klikk-funksjon*/
  }); /*Document.ready*/
