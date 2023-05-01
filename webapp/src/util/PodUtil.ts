import type { Friend, Group, Location} from "./UserData";
import { fetch, Session } from "@inrupt/solid-client-authn-browser";
import {
  Access,
  AclDataset,
  addUrl,
  buildThing,
  createAcl,
  createAclFromFallbackAcl,
  createContainerAt,
  createSolidDataset,
  createThing,
  getAgentResourceAccess,
  getContainedResourceUrlAll,
  getFile,
  getGroupResourceAccess,
  getPublicAccess,
  getResourceAcl,
  getSolidDataset,
  getSolidDatasetWithAcl,
  getStringNoLocale, 
  getThing,
  getThingAll,
  getUrl,
  getUrlAll,
  hasAccessibleAcl,
  hasFallbackAcl,
  hasResourceAcl,
  overwriteFile,
  removeThing,
  saveAclFor,
  saveSolidDatasetAt,
  setAgentResourceAccess,
  setGroupResourceAccess,
  setPublicResourceAccess,
  setStringNoLocale,
  setThing,
  setUrl,
  SolidDataset,
  Thing, 
  WithAcl,
  WithResourceInfo,
  WithServerResourceInfo
} from "@inrupt/solid-client";

import { FOAF, RDF, VCARD} from "@inrupt/vocab-common-rdf"
const URL_VOCABULARIO = "http://w3id.org/lomap/";
const RUTA_LOMAP = "lomap";
const RUTA_LOCATIONS = RUTA_LOMAP + "/locations";
const RUTA_IMAGES = "images";
const RUTA_GROUPS = RUTA_LOMAP + "/groups.ttl";

// Returns a user profile as a Thing
export async function getUserProfile(webID: string){
  console.log("PodUtil -- getUserProfile --> Parametros llamada: webID: ", webID);
  let profile = webID.split("#")[0];
    let dataSet:SolidDataset = await getSolidDataset(profile, { fetch: fetch });
    return getThing(dataSet, webID) as Thing;
}

// Returns all friends as a list
export async function getFriends(webId:string) {
  console.log("PodUtil -- getFriends --> Parametros llamada: webID: ", webId);
  let friendURLs = getUrlAll(await getUserProfile(webId), FOAF.knows);
  //console.log ("PodUtil -- getFriends -- variable friendsURLs",friendURLs); 
  let friends: Friend[] = [];

  for (let friend of friendURLs) {
    //console.log ("PodUtil -- getFriends -- bucle for. varaible friend",friend); 
    let name = getStringNoLocale(
      await getUserProfile(friend),
      FOAF.name
    ) as string;

    if (friend && friend != webId)
      friends.push({
        name: name,
        webId : friend
      });
    
  }
  return friends;
}

export async function getLocation(session:Session, idLocation:string){
  console.log("PodUtil -- getAllLocations --> Parametros llamada: idLocation: ", idLocation);
  //Si no estamo en sesión retornamos null
  if (!session || !session.info.isLoggedIn) return;
  //Conseguimos la URL de almacenamiento del POD
  const urlPOD = await getStorageURL(session);
  console.log("URL POD:")
  console.log(urlPOD);
  //Construimos la ruta del dataset de la Location
  const rutaDataset = urlPOD + RUTA_LOCATIONS + "/" + idLocation;
  console.log("getLocation --> ruta location: ", rutaDataset);
  //Pedimos el dataset de la Location al POD
  let datasetLocation = await getDataset(session, rutaDataset);
  if (datasetLocation === null){
    return null;
  }
  console.log("getLocation --> datasetLocation: ", datasetLocation);
  //Construimos la ruta de la Location (thing)
  const rutaThing = rutaDataset + "#" + idLocation;
  console.log("getLocation --> rutaThing: ", rutaThing);
  const locationThing = await getThing(datasetLocation!, rutaThing);
  console.log("getLocation --> locationThing: ", locationThing);
  return locationThing;
}

//Devuelve una lista con todas las locations del Pod del usuario que inició sesión
async function getAllLocations(session:Session){
  console.log("PodUtil -- getAllLocations");
  //console.log("Entrando en getAllLocations");
  //Si no estamo en sesión retornamos null
  if (!session || !session.info.isLoggedIn) return;
  //Conseguimos la URL de almacenamiento del POD
  const urlPOD = await getStorageURL(session);
  //Construimos la ruta del contenedor de las locations 
  const rutaContenedor = urlPOD + RUTA_LOCATIONS;
  //console.log("getAllLocations --> rutaContenedor: ", rutaContenedor);
  //Pedimos el dataset al POD
  let contenedorLocations = await getDataset(session, rutaContenedor);
  if (contenedorLocations === null){
    return null;
  }
  //console.log("getAllLocations --> datasetLocation: ", contenedorLocations);
  const listaLocations = await getContainedResourceUrlAll(contenedorLocations!);
  //console.log("getAllLocations --> lista: ", listaLocations);
  return listaLocations;
}

// Obtiene la información, añadida por los amigos del usuario, sobre una localización dada
export async function getLocationFromFriend(session:Session, friend:Friend, idLocation:string){
  console.log("Entrando en getLocationFromFriend");
  //Si no estamos en sesión retornamos null
  if (!session || !session.info.isLoggedIn) 
    return null;

  //Conseguimos la URL de almacenamiento del POD
  const urlPOD = friend.webId.split("profile/card#me")[0];
  //Construimos la ruta del dataset de la Location
  const rutaDataset = urlPOD + RUTA_LOCATIONS + "/" + idLocation;
  console.log("getLocationFromFriend --> ruta location: ", rutaDataset);
  //Pedimos el dataset de la Location al POD
  let datasetLocation = await getDataset(session, rutaDataset);
  if (datasetLocation === null){
    return null;
  }
  console.log("getLocationFromFriend --> datasetLocation: ", datasetLocation);
  //Construimos la ruta de la Location (thing)
  const rutaThing = rutaDataset + "#" + idLocation;
  console.log("getLocationFromFriend --> rutaThing: ", rutaThing);
  const locationThing = await getThing(datasetLocation!, rutaThing);
  console.log("getLocationFromFriend --> locationThing: ", locationThing);
  if (locationThing !== null) {
      return await parseFriendLocation(friend, locationThing!);
  }
  else 
    return null;
}

async function parseFriendLocation(friend:Friend, location:Thing){

  console.log ("parseFriendLocation --> location", location);
  const comments =  getStringNoLocale(location, URL_VOCABULARIO + "comments");
  console.log ("parseFriendLocation --> comments", location);
  const score = getStringNoLocale(location, URL_VOCABULARIO + "score");
  console.log ("parseFriendLocation --> comments", score);
  const name = friend.name;
  console.log ("parseFriendLocation --> name", name);
  const category = await getStringNoLocale(location, URL_VOCABULARIO + "category");
  console.log ("parseFriendLocation --> category", category);
  const id = await getStringNoLocale(location, URL_VOCABULARIO + "id_location");
  console.log ("parseFriendLocation --> id", id);

  //Calculamos la ruta absoluta de la imagen a partir de la relativa almacenada en el POD
  let image = null;
  const photo =  getUrl(location, URL_VOCABULARIO + "photo");
  console.log("parseFriendLocation   *****************  photo: ", photo);
  if (photo !== null){
    let ficheroPhoto = photo.split("/lomap/images/")[1]
    console.log("parseFriendLocation  ***************** ficheroPhoto: ", ficheroPhoto);
    let rutaImagen = await friend.webId.split("profile/card#me")[0] + "/lomap/images/" + ficheroPhoto;
    console.log("parseFriendLocation  *****************  rutaImagen: ", rutaImagen);
    image = await getFile(rutaImagen, {fetch: fetch})
      .catch(
        () => { console.log("No image found");}
      );
  } 

  let result = {
    name: name,
    category: category,
    id: id,
    comments: comments,
    score: score,
    image: image
  }

  return result;
}

export async function saveLocation(session:Session, location:Location, allowedUsers:any[]){
  console.log("PodUtil -- saveLocation --> Parametros llamada: location: ", location);
  //Crear Dataset
  const urlPOD = await getStorageURL(session);
  const rutaDataset = urlPOD + RUTA_LOCATIONS + "/" + location.id;
  console.log("PodUtil -- saveLocation -- ruta dataset: ", rutaDataset);
  let nuevoDataset= await getOrCreateDataset(session, rutaDataset);
    
  //Transformamos coordenadas y score de número a String
  const latitudeString:string  = Number(location.latitud).toString();
  const longitudeString:string = Number(location.longitud).toString();
  const scoreString:string = location.score !== null ? Number(location.score).toString() : "";

  getOrCreateContainer(session, getStorageURL(session) + "/" + RUTA_IMAGES)

  let extension: string | undefined = "";
  let rutaImagen = ""
  //Almacenar imagen relacionada si se ha subido
  if (location.image !== undefined) {
    //Recuperamos la extensión del fichero
    let extension: string | undefined = location.image.name.split(".").pop();  
    if (extension === undefined)
      extension = "";
    else
      extension = "." + extension;
    console.log("PodUtil -- saveLocation -- extension: ", extension);
    rutaImagen = await getStorageURL(session) + RUTA_IMAGES + "/" + location.id + extension;
    console.log("PodUtil -- saveLocation -- rutaImagen: ", rutaImagen);
    await overwriteFile(
      rutaImagen,
      location.image,
      { contentType: location.image.type, fetch: fetch }
    );
  }
  
  //Crear Thing
  const nuevaLocationThing = buildThing(createThing({ name: location.id }))
  .addStringNoLocale(URL_VOCABULARIO + "id_location", location.id !== null ? location.id! :"")
  .addStringNoLocale(URL_VOCABULARIO + "name", location.name)
  .addStringNoLocale(URL_VOCABULARIO + "category", location.category)
  .addStringNoLocale(URL_VOCABULARIO + "latitude", latitudeString)
  .addStringNoLocale(URL_VOCABULARIO + "longitude", longitudeString)
  .addStringNoLocale(URL_VOCABULARIO + "comments", location.comments !== null ? location.comments! : "") 
  .addStringNoLocale(URL_VOCABULARIO + "score", scoreString)
  .addUrl(URL_VOCABULARIO + "photo", rutaImagen )
  .addUrl(RDF.type, URL_VOCABULARIO + "Location")
  .build();
  
  //Insertar thing en dataset
  nuevoDataset = await setThing(nuevoDataset!, nuevaLocationThing);
  
  //Guardar el dataset modificado en el POD
  const datasetGuardado = await saveSolidDatasetAt(
    rutaDataset,
    nuevoDataset,
    { fetch: fetch }             // fetch from authenticated Session
  );
    
  //Devolvemos la nueva location guardada en el pod
  const rutaNuevaLocationGuardada = rutaDataset + "#" + location.id

  // Asignamos los permisos a los usuarios de la lista
  for (var i = 0; i < allowedUsers.length; i++) {
    await setUserRead(session, rutaNuevaLocationGuardada, allowedUsers[i], true)
  }

  const nuevaLocationGuardada = await getThing(datasetGuardado, rutaNuevaLocationGuardada);
  return nuevaLocationGuardada;
}

//Obtiene la URL de almacenamiento del POD a partir de la sesión iniciada por el usuario
async function getStorageURL (session:Session){
  console.log("PodUtil -- getStorageURL");
  if (!session || !session.info.isLoggedIn) return;
  let storageUrl = "";
  await (async () => {
    const profileDataset = await getSolidDataset(session.info.webId!, {
      fetch: session.fetch,
    });
    const profileThing = await getThing(profileDataset, session.info.webId!);
    const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";
    const podsUrls = await getUrlAll(profileThing!, STORAGE_PREDICATE);
    storageUrl = podsUrls[0];
  })();
  return storageUrl;
}
  
//Obtiene un contenedor del Pod. Si no existe lo crea.
async function getOrCreateContainer(session:Session, ContainerURI:string){
  console.log("PodUtil -- getOrCreateContainer --> Parametros llamada: ContainerURI: ", ContainerURI);
  if (!session || !session.info.isLoggedIn) return;
  try {
      const fetch = session.fetch;
      const containerDataset:SolidDataset = await createContainerAt(ContainerURI, { fetch });
      return containerDataset;
  } catch (error: any) {
      return error;
  }
}

//Obtiene un dataset del pod. si no existe lo crea
async function getOrCreateDataset(session:Session, datasetURI:string) {
  console.log("PodUtil -- getOrCreateDataset --> Parametros llamada: datasetURI: ", datasetURI);
  if (!session || !session.info.isLoggedIn) return;
  try {
    const fetch = session.fetch;
    const dataset = await getSolidDataset(datasetURI, { fetch }); 
    return dataset;
  } catch (error:any) {
    if (error.statusCode === 404) {
      const dataset = await saveSolidDatasetAt(
        datasetURI,
        createSolidDataset(),
        {
          fetch,
        }
      );
      return dataset;
    }
  }
}

//Obtiene un dataset del pod. si no existe devuelve null
async function getDataset(session:Session, datasetURI:string) {
  console.log("PodUtil -- getDataset --> Parametros llamada: datasetURI: ", datasetURI);
  if (!session || !session.info.isLoggedIn) 
    return;
  try {
    const fetch = session.fetch;
    const dataset = await getSolidDataset(datasetURI, { fetch }); 
    return dataset;
  } catch (error:any) {
    if (error.statusCode === 403) {
      console.log("PodUtil -- getDataset --> Error 403. Usuario no autorizado a ", datasetURI);
      return null;
    }
    if (error.statusCode === 404) {
      console.log("PodUtil -- getDataset --> Error 404. No existe ", datasetURI);
      return null;
    }
  }
}

//Si no existen en el Pod crea los contenedores (directorios) y los dataset necesarios para la aplciación
export async function initPodForLomap (session:Session){
  console.log("PodUtil -- initPodForLomap");
  const urlAlmacenamiento = await getStorageURL(session);
  console.log("initPodForLomap -- Ruta base del POD: ", urlAlmacenamiento);
  //Por defecto se crean con permisos de lectura para todo el mundo los contenedores.
  await getOrCreateContainer(session,urlAlmacenamiento + RUTA_LOMAP);
  console.log("initPodForLomap -- Comprobar en pod ruta " + RUTA_LOMAP + ".");
  setPublicAccessRead(session, urlAlmacenamiento + RUTA_LOMAP, true);
  console.log("initPodForLomap -- Crear ACL para " + RUTA_LOMAP + ".");

  await getOrCreateContainer(session,urlAlmacenamiento + RUTA_LOCATIONS);
  console.log("initPodForLomap -- Comprobar en pod ruta " + RUTA_LOCATIONS + ".");
  setPublicAccessRead(session, urlAlmacenamiento + RUTA_LOCATIONS, true);
  console.log("initPodForLomap -- Crear ACL para " + RUTA_LOCATIONS + ".");

  await getOrCreateContainer(session,urlAlmacenamiento + RUTA_IMAGES);
  console.log("initPodForLomap -- Comprobar en pod ruta " + RUTA_IMAGES + ".");
  setPublicAccessRead(session, urlAlmacenamiento + RUTA_IMAGES, true);
  console.log("initPodForLomap -- Crear ACL para " + RUTA_IMAGES + ".");

  await getOrCreateDataset(session, urlAlmacenamiento + RUTA_GROUPS);
  console.log("initPodForLomap -- Comprobar en pod recurso " + RUTA_GROUPS + ".");
  setPublicAccessRead(session, urlAlmacenamiento + RUTA_GROUPS, false);
  console.log("initPodForLomap -- Crear ACL para recurso " + urlAlmacenamiento + RUTA_GROUPS + ".");
  
  //Crarmos por defecto un grupo con todos los amigos del pod
  let friends: Friend[] = await getFriends(session.info.webId!);
  
  let grupoTodos: Group = {
      name: "Todos",
      members: friends
  };

  const grupoGuardado: Group | null = await saveGroup(session, grupoTodos);
  console.log("initPodForLomap -- Creado grupo Todos con todos los amigos del POD : ", grupoGuardado);
}

// LOCATION

export async function getLocationObject(session: Session, idLocation: string) {
  console.log("PodUtil -- getLocationObject --> Parametros llamada: idLocation: ", idLocation);
  const location = await getLocation(session, idLocation);
  if (location !== null)
    return parseLocation(session, location!);
  else return null
}

export async function getAllLocationsObject(session: Session) {
  console.log ("PodUtil.ts -- getAllLocationsObject")
  const listaLocations = await getAllLocations(session);
  console.log ("PodUtil.ts -- getAllLocationsObject -- listaLocations", listaLocations);
  if (listaLocations === undefined || listaLocations === null) return null;
  let listaObjectsLocations  = []; 
  for (let elemento of listaLocations) { 
    let idLocation = elemento.substring(elemento.lastIndexOf("/")+1);
    console.log("idLocation", idLocation);
    
    let locationObject = await getLocationObject(session,idLocation);
    if (locationObject !== null){
      listaObjectsLocations.push(locationObject);
    }
  }
  return listaObjectsLocations;

}

export async function getUserName(session:Session){
  console.log ("PodUtil.ts -- getUserName");
  if (!session || !session.info.isLoggedIn) 
    return null;
  console.log ("PodUtil.ts -- getUserName -- session.info.webId: ",session.info.webId );
  const profileDataset = await getSolidDataset(session.info.webId!, {
    fetch: session.fetch,
  });
  //console.log("getuserName--> profileDataset", profileDataset);
  const profileThing = await getThing(profileDataset, session.info.webId!);
  //console.log("getuserName--> profileThing", profileThing);
  const name = await getStringNoLocale(profileThing!, FOAF.name);
  console.log("getuserName--> name", name);
  return name
}

export async function getUserNameFromWebId(webId:string){
  console.log ("PodUtil.ts -- getUserNameFromWebId --> Parametros llamada: webId: ", webId);
  if (typeof webId === 'undefined' || !webId || webId.length === 0 || webId === "")
    return "";
  const profileThing = await getUserProfile(webId);
  const name = await getStringNoLocale(profileThing!, FOAF.name);
  return name;
}

async function parseLocation (session:Session, location:Thing){
  console.log ("PodUtil.ts -- parseLocation --> Parametros llamada: location: ", location);
  console.log ("parseLocation --> location", location);
  const comments =  getStringNoLocale(location, URL_VOCABULARIO + "comments");
  console.log ("parseLocation --> comments", location);
  const score = getStringNoLocale(location, URL_VOCABULARIO + "score");
  console.log ("parseLocation --> comments", score);
  const name = await getUserName(session);
  console.log ("parseLocation --> name", name);
  const category = await getStringNoLocale(location, URL_VOCABULARIO + "category");
  console.log ("parseLocation --> category", category);
  const id = await getStringNoLocale(location, URL_VOCABULARIO + "id_location");
  console.log ("parseLocation --> id", id);
  
  //Calculamos la ruta absoluta de la imagen a partir de la relativa almacenada en el POD
  let image = null;
  const photo =  getUrl(location, URL_VOCABULARIO + "photo");
  if (photo !== null){
    
    image = await getFile(photo, {fetch: fetch})
      .catch(
        () => { console.log("No image found");}
      );
  } 

  let result = {
    name: name,
    category: category,
    id: id,
    comments: comments,
    score: score,
    image: image
  }

  return result;
}

//GRUPOS

//Devuelve una lista con todos los grupos del Pod del usuario que inició sesión
export async function getAllGroups(session:Session){
  console.log ("PodUtil.ts -- getAllGroups");
  //Si no estamo en sesión retornamos null
  if (!session || !session.info.isLoggedIn) return;
  //Conseguimos la URL de almacenamiento del POD
  const urlPOD = await getStorageURL(session);
  //Construimos la ruta del dataset de los grupos
  const urlDatasetGroups = urlPOD + RUTA_GROUPS ;
  //Pedimos el dataset al POD
  let listGroups:Thing[] = [];
  let datasetLocations:SolidDataset | null | undefined;
  try {
    //Si no existe el dataset 
    const fetch = session.fetch;
    datasetLocations = await getSolidDataset(urlDatasetGroups, {fetch});
  } catch (error:any) {
    //Si no existe el dataset de los grupos devolvemos una lista vacía.
    if (error.statusCode === 404) {  
      return listGroups;
    }
  }
  listGroups = await getThingAll(datasetLocations!);
  console.log("PodUtil.ts -- getAllGroups --> lista Grupos: ", listGroups);
  return listGroups;
}

async function parseGroup (group:Thing){
  console.log ("PodUtil.ts -- parseGroup --> Parametros llamada: group: ", group);
  const name:string|null =  getStringNoLocale(group, VCARD.fn);
  const members:string[] = getUrlAll(group, VCARD.hasMember);
  
  let listaMembers:Friend[] = [];
  for (let member of members) {
    let nameFriend:string|null = await getUserNameFromWebId(member);
    let friend:Friend = {
      name: nameFriend!=null? nameFriend : "",
      webId: member
    } 
    listaMembers.push(friend);
  }
  
  let result:Group = {
    name: name != null ? name : "",
    webId: group.url, 
    members: listaMembers
  }
 
  return result;
}

export async function getAllGroupsObject(session: Session) {
  console.log ("PodUtil.ts -- getAllGroupsObject");
  const listaGroups = await getAllGroups(session);
  let listaObjectsGroup:Group[]  = []; 

  if (listaGroups === undefined || listaGroups === null) 
    return listaObjectsGroup;
  
  for (let elemento of listaGroups) { 
    let groupObject = await parseGroup(elemento);  
    if (groupObject !== null){
      listaObjectsGroup.push(groupObject);
    }
  }
  return listaObjectsGroup;
}

export async function saveGroup(session:Session, group:Group){
  console.log ("PodUtil.ts -- saveGroup --> Parametros llamada: group: ", group);
  //Conseguimos el dataset de los grupos
  const urlPOD = await getStorageURL(session);
  const rutaDataset = urlPOD + RUTA_GROUPS; 
  let groupsDataset = await getSolidDataset(
    rutaDataset,
    { fetch: fetch }
  );

  //Crear Thing a partir del objeto grupo
  let nuevoGrupoThing = createThing({ name: group.name });
  nuevoGrupoThing = setStringNoLocale(nuevoGrupoThing,VCARD.fn,group.name);
  nuevoGrupoThing = setUrl(nuevoGrupoThing,RDF.type, VCARD.Group);
  for (let member of group.members) {
    nuevoGrupoThing = addUrl(nuevoGrupoThing,VCARD.hasMember,member.webId);
  }
  
  //Actualizamos el dataset con el nuevo Grupo
  groupsDataset = setThing(groupsDataset,nuevoGrupoThing);

  //Guardar el dataset modificado en el POD
  const datasetGuardado = await saveSolidDatasetAt(
    rutaDataset,
    groupsDataset,
    { fetch: fetch }
  );
    
  //Devolvemos el nuevo grupo Guardado
  const urlNuevoGrupoGuardado = rutaDataset + "#" + group.name;
  const nuevoGrupoGuardado: Thing | null = await getThing(datasetGuardado, urlNuevoGrupoGuardado);
  if (nuevoGrupoGuardado === null)
    return null;
  const nuevoObjectGroupGuardado:Group = await parseGroup(nuevoGrupoGuardado);
  return nuevoObjectGroupGuardado;
}

export async function deleteGroup(session: Session, group: Group){
  console.log ("PodUtil.ts -- deleteGroup --> Parametros llamada: group: ", group);
  //Conseguimos el dataset de los grupos
  const urlPOD = await getStorageURL(session);
  const rutaDataset = urlPOD + RUTA_GROUPS; 
  let groupsDataset = await getSolidDataset(
    rutaDataset,
    { fetch: fetch }
  );

  //Borramos el grupo de groupsDataset
  
  //Generamoss el webId a partir del nombre del grupo (webId es campo opcional)
  //Construimos la ruta del dataset de los grupos
  const webidGrupo = urlPOD + RUTA_GROUPS + "#" + group.name;
  groupsDataset = await removeThing(groupsDataset,webidGrupo);
  
  //Guardar el dataset modificado en el POD
  await saveSolidDatasetAt(
    rutaDataset,
    groupsDataset,
    { fetch: fetch }
  );
    
  //Devolvemos la lista de grupos tras el borrado
  return await getAllGroupsObject(session);
}

// PERMISOS

// Consegue la lista de control de acceso (ACL) propia del dataset, si esta disponible,
// o inicia una nueva, si es posible.
async function getDatasetACL(myDatasetWithAcl:SolidDataset & WithServerResourceInfo & WithAcl){  
  console.log ("PodUtil.ts -- getDatasetACL --> Parametros llamada:: myDatasetWithAcl: ", myDatasetWithAcl);
  let resourceAcl:AclDataset;
  if (!hasResourceAcl(myDatasetWithAcl)) { 
    if (!hasAccessibleAcl(myDatasetWithAcl)) {
      throw new Error(
        "The current user does not have permission to change access rights to this folder."
      );
    }
    if (!hasFallbackAcl(myDatasetWithAcl)) {
      // Initialise a new empty ACL
      resourceAcl = createAcl(myDatasetWithAcl);
    } else {
      resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl);
    }
  } else {
    resourceAcl = getResourceAcl(myDatasetWithAcl);
  }
  console.log("PodUtil.ts -- getDatasetACL -- resourceAcl: ",resourceAcl);
  return resourceAcl;
}

//Control de permisos. Consultar acceso público de lectura.
export async function getPublicAccessRead(session: Session, resource: string){
  console.log ("PodUtil.ts -- getPublicAccessRead --> Parametros llamada: resource: ", resource);
  if (!session || !session.info.isLoggedIn) 
    return;
  const fetch = session.fetch;
  const myDatasetWithAcl: SolidDataset & WithServerResourceInfo & WithAcl = await getSolidDatasetWithAcl(resource, { fetch });
  const publicAccess: Access | null = getPublicAccess(myDatasetWithAcl);
  if (publicAccess !== null)
    return publicAccess.read;
  else
    return false;
}

//Control de permisos. Establecer acceso público de lectura.
export async function setPublicAccessRead(session: Session, resource: string, permiso:boolean){
  console.log ("PodUtil.ts -- setPublicAccessRead ");
  console.log ("   Parametros llamada: resource: ", resource);
  console.log ("                       permiso: ", permiso);
  if (!session || !session.info.isLoggedIn) 
    return;
  const fetch = session.fetch;
  // Buscar el SolidDataset y sus ACLs asociadas , si están disponibles.
  const myDatasetWithAcl:SolidDataset & WithServerResourceInfo & WithAcl = await getSolidDatasetWithAcl(resource, { fetch });
  // Conseguiemos la lista de control de acceso (ACL) propia del dataset, si esta disponible,
  // o iniciamos una nueva, si es posible.
  const datasetAcl:AclDataset = await getDatasetACL(myDatasetWithAcl);
  
  // Actualizamos la ACL
  //   Mantenemos siempre el acceso completo para nuestro usuario.
  let updatedAcl: AclDataset & WithResourceInfo = setAgentResourceAccess(
    datasetAcl,
    session.info.webId!,
    { read: true, append: true, write: true, control: true }
  );
  //   Concedemos el permiso de lectura general al recurso
  updatedAcl = setPublicResourceAccess(
    datasetAcl,
    { read: permiso, append: false, write: false, control: false },
  );
  // Guardamos la ACL modificada . Se utiliza el comentario para evitar el error.
  // @ts-ignore
  await saveAclFor(myDatasetWithAcl,updatedAcl, { fetch });
  
  //Comprobamos. Volvemos a pedir la acl después de grabarla
  const publicAccess = getPublicAccess(myDatasetWithAcl);
  return publicAccess?.read === permiso;
}  
  
export async function getUserRead(session: Session, resource: string, userId: string){
  console.log ("PodUtil.ts -- getUserRead ");
  console.log ("   Parametros llamada: resource: ", resource);
  console.log ("                       userId: ", userId);
  if (!session || !session.info.isLoggedIn) 
    return;
  const fetch = session.fetch;
  const myDatasetWithAcl: SolidDataset & WithServerResourceInfo & WithAcl = await getSolidDatasetWithAcl(resource, { fetch });
  const datasetAcl: AclDataset = await getDatasetACL(myDatasetWithAcl);
  const userAccess: Access | null = getAgentResourceAccess(datasetAcl, userId);
  if (userAccess !== null)
    return userAccess.read;
  else
    return false;
}

export async function setUserRead(session: Session, resource: string, userId: string, permiso:boolean){
  console.log ("PodUtil.ts -- setUserRead ");
  console.log ("   Parametros llamada: resource: ", resource);
  console.log ("                       userId: ", userId);
  console.log ("                       permiso: ", permiso);
  //console.log ("   ---> getUserRead <--- ");
  if (!session || !session.info.isLoggedIn) 
    return;
  const fetch = session.fetch;
  //Obtenemos el dataset
  const myDatasetWithAcl:SolidDataset & WithServerResourceInfo & WithAcl = await getSolidDatasetWithAcl(resource, { fetch });
  //Obtenemos la ACL
  const datasetAcl:AclDataset = await getDatasetACL(myDatasetWithAcl);
  // Actualizamos la ACL
  //    Mantenemos siempre el acceso completo para nuestro usuario.
  let updatedAcl: AclDataset & WithResourceInfo = setAgentResourceAccess(
    datasetAcl,
    session.info.webId!,
    { read: true, append: true, write: true, control: true }
  );
  //    Concedemos el permiso de lectura al usuario
  updatedAcl = setAgentResourceAccess(
    datasetAcl,
    userId,
    { read: permiso, append: false, write: false, control: false },
  );
  // Guardamos la ACL modificada . Se utiliza el comentario para evitar el error.
  // @ts-ignore
  await saveAclFor(myDatasetWithAcl,updatedAcl, { fetch });
  
  //Comprobamos. Volvemos a pedir la acl después de grabarla
  const userReadAccess:Access = getAgentResourceAccess(datasetAcl, userId);
  return userReadAccess.read === permiso;
}

export async function getGroupRead(session: Session, resource: string, groupId: string){
  console.log ("PodUtil.ts -- getGroupRead ");
  console.log ("   Parametros llamada: resource: ", resource);
  console.log ("                       userId: ", groupId);
  if (!session || !session.info.isLoggedIn) 
    return;
  const fetch = session.fetch;
  const myDatasetWithAcl: SolidDataset & WithServerResourceInfo & WithAcl = await getSolidDatasetWithAcl(resource, { fetch });
  const datasetAcl: AclDataset = await getDatasetACL(myDatasetWithAcl);

  const groupAccess: Access | null = getGroupResourceAccess(datasetAcl, groupId);
  if (groupAccess !== null)
    return groupAccess.read;
  else
    return false;
}

export async function setGroupRead(session: Session, resource: string, groupId: string, permiso:boolean){
  console.log ("PodUtil.ts -- setGroupRead ");
  console.log ("   Parametros llamada: resource: ", resource);
  console.log ("                       userId: ", groupId);
  console.log ("                       permiso: ", permiso);
  if (!session || !session.info.isLoggedIn) 
    return;
  const fetch = session.fetch;
  //Obtenemos el dataset
  const myDatasetWithAcl:SolidDataset & WithServerResourceInfo & WithAcl = await getSolidDatasetWithAcl(resource, { fetch });
  //Obtenemos la ACL
  const datasetAcl:AclDataset = await getDatasetACL(myDatasetWithAcl);
  // Actualizamos la ACL
  //    Mantenemos siempre el acceso completo para nuestro usuario.
  let updatedAcl: AclDataset & WithResourceInfo = setGroupResourceAccess(
    datasetAcl,
    session.info.webId!,
    { read: true, append: true, write: true, control: true }
  );
  //    Concedemos el permiso de lectura al usuario
  updatedAcl = setGroupResourceAccess(
    datasetAcl,
    groupId,
    { read: permiso, append: false, write: false, control: false },
  );
  // Guardamos la ACL modificada . Se utiliza el comentario para evitar el error.
  // @ts-ignore
  await saveAclFor(myDatasetWithAcl,updatedAcl, { fetch });
  
  //Comprobamos. Volvemos a pedir la acl después de grabarla
  const userGroupAccess:Access = getGroupResourceAccess(datasetAcl, groupId);
  return userGroupAccess.read === permiso;
}

/* Demasiado bonito para ser cierto. No funciona (experimental)
//Control de permisos. Consultar acceso público de lectura.
export function getPublicAccessRead(session: Session, resource: string){
  if (!session || !session.info.isLoggedIn) 
    return false;
  universalAccess.getPublicAccess(
    resource,                   // Resource
    { fetch: session.fetch }   // fetch function from authenticated session
  ).then((returnedAccess) => {
    if (returnedAccess === null) {
      console.log("PodUtil -- getPublicAccess -- No se pueden cargar los detalles de acceso público del recurso " + resource + ".");
      return false;
    } else {
      console.log("PodUtil -- getPublicAccess -- Detalles de acceso público del recurso " + resource + ".");
      console.log("Acceso público retornado: ", JSON.stringify(returnedAccess));
      //Devolvemos el permiso de lectura pública del recurso. 
      return returnedAccess.controlRead;
    }
  });
}

//Control de permisos. Establecer acceso público de lectura.
export function setPublicAccessRead(session: Session, resource: string, permiso:boolean){
  if (!session || !session.info.isLoggedIn) 
    return false;
    universalAccess.setPublicAccess(
      resource,                   // Resource
      {read: permiso},            // Permiso de lectura
      { fetch: session.fetch }    // fetch function from authenticated session
    ).then((returnedAccess) => {
      if (returnedAccess === null) {
        console.log("PodUtil -- setPublicAccess -- No se pueden modificar los detalles de acceso público del recurso " + resource + ".");
        return false;
      } else {
        console.log("PodUtil -- setPublicAccess -- Detalles de acceso público del recurso " + resource + ".");
        console.log("PodUtil -- Acceso público modificado: ", JSON.stringify(returnedAccess));
        //Devolvemos true si la operación se realizó correctamente
        if (returnedAccess.controlRead === permiso)
          return true;
        else
          return false;
      }
    });
}
*/

//export async function pruebas (session:Session){
//  const jsonLocation = await getLocationJSON(session, "64337cca48c1302f714702ac");
//  return jsonLocation;
//  
//  //const pruebaLocation = await getLocation (session, "64337cca48c1302f714702ac");
//  //const pruebaLocation = await getLocation (session, "64337cca48c1302f7147");
//  //console.log ("pruebaLocation: ", pruebaLocation);
//  //const jsonLocation = parseLocation(session, pruebaLocation!);
//  //console.log ("jsonLocation: ", jsonLocation);
//  
//  /*const urlAlmacenamiento = await getStorageURL(session);
//  const rutaDataset = urlAlmacenamiento + RUTA_LOCATIONS + "/" + "64337cca48c1302f714702ac"+#+"64337cca48c1302f714702ac"
//  const urlAlmacenamiento = await getStorageURL(session);
//  const rutaDataset = urlAlmacenamiento + RUTA_LOCATIONS + "/pCD"
//  console.log("ruta dataset: ", rutaDataset);
//  const datasetPrueba= await getOrCreateDataset(session, rutaDataset);
//  console.log("datasetPrueba: ", datasetPrueba);*/
//}



// export async function getLocationJSON(session:Session, idLocation:string){
//   let jsonLocation = JSON.parse("{}");
//   const location = await getLocation (session, idLocation);
//   if (location !== null){
//     jsonLocation = parseLocation(session, location!); 
//   }
//   return jsonLocation;
// }

