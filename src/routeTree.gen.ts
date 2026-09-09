/* eslint-disable */
// @ts-nocheck
import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as OwnerRouteImport } from './routes/owner'
import { Route as OtherServicesRouteImport } from './routes/other-services'
import { Route as AboutDrSaadRouteImport } from './routes/about-dr-saad'
import { Route as ReviewsRouteImport } from './routes/reviews'
import { Route as BookAssessmentRouteImport } from './routes/book-assessment'
import { Route as BackPainRouteImport } from './routes/back-pain-physiotherapy-islamabad'
import { Route as SciaticaRouteImport } from './routes/sciatica-physiotherapy-islamabad'
import { Route as DiscBulgeRouteImport } from './routes/disc-bulge-physiotherapy-islamabad'
const IndexRoute=IndexRouteImport.update({id:'/',path:'/',getParentRoute:()=>rootRouteImport} as any)
const OwnerRoute=OwnerRouteImport.update({id:'/owner',path:'/owner',getParentRoute:()=>rootRouteImport} as any)
const OtherServicesRoute=OtherServicesRouteImport.update({id:'/other-services',path:'/other-services',getParentRoute:()=>rootRouteImport} as any)
const AboutDrSaadRoute=AboutDrSaadRouteImport.update({id:'/about-dr-saad',path:'/about-dr-saad',getParentRoute:()=>rootRouteImport} as any)
const ReviewsRoute=ReviewsRouteImport.update({id:'/reviews',path:'/reviews',getParentRoute:()=>rootRouteImport} as any)
const BookAssessmentRoute=BookAssessmentRouteImport.update({id:'/book-assessment',path:'/book-assessment',getParentRoute:()=>rootRouteImport} as any)
const BackPainRoute=BackPainRouteImport.update({id:'/back-pain-physiotherapy-islamabad',path:'/back-pain-physiotherapy-islamabad',getParentRoute:()=>rootRouteImport} as any)
const SciaticaRoute=SciaticaRouteImport.update({id:'/sciatica-physiotherapy-islamabad',path:'/sciatica-physiotherapy-islamabad',getParentRoute:()=>rootRouteImport} as any)
const DiscBulgeRoute=DiscBulgeRouteImport.update({id:'/disc-bulge-physiotherapy-islamabad',path:'/disc-bulge-physiotherapy-islamabad',getParentRoute:()=>rootRouteImport} as any)
export interface FileRoutesByFullPath{'/':typeof IndexRoute;'/owner':typeof OwnerRoute;'/other-services':typeof OtherServicesRoute;'/about-dr-saad':typeof AboutDrSaadRoute;'/reviews':typeof ReviewsRoute;'/book-assessment':typeof BookAssessmentRoute;'/back-pain-physiotherapy-islamabad':typeof BackPainRoute;'/sciatica-physiotherapy-islamabad':typeof SciaticaRoute;'/disc-bulge-physiotherapy-islamabad':typeof DiscBulgeRoute}
export interface FileRoutesByTo extends FileRoutesByFullPath{}
export interface FileRoutesById{__root__:typeof rootRouteImport;'/':typeof IndexRoute;'/owner':typeof OwnerRoute;'/other-services':typeof OtherServicesRoute;'/about-dr-saad':typeof AboutDrSaadRoute;'/reviews':typeof ReviewsRoute;'/book-assessment':typeof BookAssessmentRoute;'/back-pain-physiotherapy-islamabad':typeof BackPainRoute;'/sciatica-physiotherapy-islamabad':typeof SciaticaRoute;'/disc-bulge-physiotherapy-islamabad':typeof DiscBulgeRoute}
export interface FileRouteTypes{fileRoutesByFullPath:FileRoutesByFullPath;fullPaths:'/'|'/owner'|'/other-services'|'/about-dr-saad'|'/reviews'|'/book-assessment'|'/back-pain-physiotherapy-islamabad'|'/sciatica-physiotherapy-islamabad'|'/disc-bulge-physiotherapy-islamabad';fileRoutesByTo:FileRoutesByTo;to:FileRoutesByFullPath extends never?never: '/'|'/owner'|'/other-services'|'/about-dr-saad'|'/reviews'|'/book-assessment'|'/back-pain-physiotherapy-islamabad'|'/sciatica-physiotherapy-islamabad'|'/disc-bulge-physiotherapy-islamabad';id:'__root__'|keyof FileRoutesById;fileRoutesById:FileRoutesById}
export interface RootRouteChildren{IndexRoute:typeof IndexRoute;OwnerRoute:typeof OwnerRoute;OtherServicesRoute:typeof OtherServicesRoute;AboutDrSaadRoute:typeof AboutDrSaadRoute;ReviewsRoute:typeof ReviewsRoute;BookAssessmentRoute:typeof BookAssessmentRoute;BackPainRoute:typeof BackPainRoute;SciaticaRoute:typeof SciaticaRoute;DiscBulgeRoute:typeof DiscBulgeRoute}
declare module '@tanstack/react-router'{interface FileRoutesByPath{'/':{id:'/';path:'/';fullPath:'/';preLoaderRoute:typeof IndexRouteImport;parentRoute:typeof rootRouteImport};'/owner':{id:'/owner';path:'/owner';fullPath:'/owner';preLoaderRoute:typeof OwnerRouteImport;parentRoute:typeof rootRouteImport};'/other-services':{id:'/other-services';path:'/other-services';fullPath:'/other-services';preLoaderRoute:typeof OtherServicesRouteImport;parentRoute:typeof rootRouteImport};'/about-dr-saad':{id:'/about-dr-saad';path:'/about-dr-saad';fullPath:'/about-dr-saad';preLoaderRoute:typeof AboutDrSaadRouteImport;parentRoute:typeof rootRouteImport};'/reviews':{id:'/reviews';path:'/reviews';fullPath:'/reviews';preLoaderRoute:typeof ReviewsRouteImport;parentRoute:typeof rootRouteImport};'/book-assessment':{id:'/book-assessment';path:'/book-assessment';fullPath:'/book-assessment';preLoaderRoute:typeof BookAssessmentRouteImport;parentRoute:typeof rootRouteImport};'/back-pain-physiotherapy-islamabad':{id:'/back-pain-physiotherapy-islamabad';path:'/back-pain-physiotherapy-islamabad';fullPath:'/back-pain-physiotherapy-islamabad';preLoaderRoute:typeof BackPainRouteImport;parentRoute:typeof rootRouteImport};'/sciatica-physiotherapy-islamabad':{id:'/sciatica-physiotherapy-islamabad';path:'/sciatica-physiotherapy-islamabad';fullPath:'/sciatica-physiotherapy-islamabad';preLoaderRoute:typeof SciaticaRouteImport;parentRoute:typeof rootRouteImport};'/disc-bulge-physiotherapy-islamabad':{id:'/disc-bulge-physiotherapy-islamabad';path:'/disc-bulge-physiotherapy-islamabad';fullPath:'/disc-bulge-physiotherapy-islamabad';preLoaderRoute:typeof DiscBulgeRouteImport;parentRoute:typeof rootRouteImport}}}
const rootRouteChildren:RootRouteChildren={IndexRoute,OwnerRoute,OtherServicesRoute,AboutDrSaadRoute,ReviewsRoute,BookAssessmentRoute,BackPainRoute,SciaticaRoute,DiscBulgeRoute}
export const routeTree=rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()
import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start'{interface Register{ssr:true;router:Awaited<ReturnType<typeof getRouter>>;config:Awaited<ReturnType<typeof startInstance.getOptions>>}}
