
// Referencias HTML

const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblticket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false;

});

socket.on('disconnect', () => {

    btnAtender.disabled = true;

});

socket.on('tickets-pendientes', (total) => {
    lblPendientes.innerText = total;
})

btnAtender.addEventListener( 'click', () => {
    

    socket.emit( 'atender-ticket', { escritorio }, ( { ok, ticket, msg } ) => {
        
        if ( !ok ) {
            lblticket.innerText = 'Nadie.';
            return divAlert.style.display = '';
        }

        lblticket.innerText = 'Ticket ' + ticket.numero;

    });
    // socket.emit( 'siguiente-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket;
    // });

});
