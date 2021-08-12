var  offlineCacheName  =  "wholeSiteCachedv3" ;

var  offlinePageCache  =  "customOfflinePage" ;

var  offlineURL  =  "offline.html" ;

esto . addEventListener ( "instalar" ,  función ( evento )  {
  consola . log ( "Instalando Service Worker" ) ;

  evento . esperar hasta (
    cachés
      . abierto ( offlinePageCache )
      . luego ( función ( caché )  {
        retorno de  caché . agregar ( offlineURL ) ;
      } )
      . entonces ( función ( )  {
        volver a  sí mismo . skipWaiting ( ) ;
      } )
  ) ;
} ) ;

esto . addEventListener ( "buscar" ,  función ( evento )  {
  evento . responder con (
    ir a buscar ( evento . petición )
      . entonces ( función ( respuesta )  {
        var  responseClone  =  respuesta . clon ( ) ;
        cachés . abierto ( offlineCacheName ) . luego ( función ( caché )  {
          caché . poner ( evento . petición ,  responseClone ) ;
        } ) ;
         respuesta de retorno ;
      } )
      . catch ( function ( )  {
        devolver  cachés . coincidencia ( evento . solicitud ) . entonces ( función ( respuesta )  {
           respuesta de  retorno ||  cachés . coincidir ( offlineURL ) ;
        } ) ;
      } )
  ) ;
} ) ;