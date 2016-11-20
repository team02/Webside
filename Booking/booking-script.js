
//Datepicker slik at bruker kan velge dato for ankomst og avreise.
//Bruker dateformat slik at datoen vil bli vist som dag/månde/år.
$(document).ready(function(){
  $('.datovelger').each(function(){
      $(this).datepicker({dateFormat : 'dd/mm/yy'});
  });

    /*Setter oransje farge rundt knappen ved fokus.
    Dette er for bedre estetikk*/
    $('.knapp').focus(function(){
    $(this).css('outline-color', '#ffbe6b');
    });

    /*Kombinerer javascript og jQuery for å øke antall klikk*/
    /*Velger å kombinere jQuery og Javascript grunnet av at det er
    enklere å utføre andre funksjoner i hver script*/

    /*Variabler som omfatter det generelle utseende*/
    var boks = $('#boks'); /*Variabel for første boks*/
    var boks2 = $('#boks2'); /*Variabel for andre boks*/
    var boks3 = $('#boks3'); /*Variabel for tredje boks*/
    var sekund = 1000; /*Variabel som gjør det enklere å regne i sekunder.*/
    var teller = 0;

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
        $('#hytteValgt').focus();
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
        setTimeout(function(){
          $('.knapp').removeAttr('disabled');
          }, sekund*2);

        /*Rull videre til neste validering*/
        $(boks).animate({left: '100%'}, sekund);
        $(boks2).animate({top: '-150px'}, sekund);

        teller += 1;

      }

      if (teller === 2){

        $(boks2).stop().animate({left: '100%'}, sekund);
        $(boks3).stop().animate({top: '-400px'}, sekund);
        $('.knapp').html('Bekreft bestilling');

        $('.knapp').attr('disabled', 'disabled');
        setTimeout(function(){
          $('.knapp').removeAttr('disabled');
        }, sekund*2);


      }



    });
  });
