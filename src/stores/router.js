import { Router } from 'director/build/director';
import { autorun } from 'mobx';

export function startRouter(stores) {
    const { store, candStore, compStore, bookStore } = stores

    const routerRefresh = (workbench, id) => {  
        let details = {
            workbench
        }
        
        switch(workbench) {
            case 'candidates':
                details.searchRefresh = candStore.fetchCandidateData
                details.openRecord = candStore.setOpenCand
                details.id = id
                store.refreshPage(details)
                break
            case 'companies':
                details.searchRefresh = compStore.fetchCompaniesData
                details.openRecord = compStore.setOpenComp
                details.id = id
                store.refreshPage(details)
                break
            case 'bookings':
                details.searchRefresh = bookStore.fetchBookingData
                details.openRecord = bookStore.setOpenBook
                if(id === null) {
                    details.id = null
                } else {
                    details.id = {id}
                }
                store.refreshPage(details)
                break      
            default:
                return null    
        }
    }

    // update state on url change
    const router = new Router({
        // '/login': () => store.setWorkbench('login'),
        '/candidates': () => routerRefresh('candidates', null),
        '/candidates/:candId': (candId) => routerRefresh('candidates', candId),
        '/companies': () => routerRefresh('companies', null),
        '/companies/:compId': (compId) => routerRefresh('companies', compId),
        '/bookings': () => routerRefresh('bookings', null),
        '/bookings/:bookId': (bookId) => routerRefresh('bookings', bookId),
    })
    router.configure({
        notfound: () => routerRefresh('candidates'),
        html5history: true,
        strict: false
    })
    router.init()

    // update url on state changes
    autorun(() => {
        let path = store.currentPath
        if(candStore.openCand && store.workbench === 'candidates' && candStore.openCand.id){
            path = path + candStore.openCand.id
        } else if (compStore.openComp && store.workbench === 'companies' && compStore.openComp.id) {
            path = path + compStore.openComp.id
        } else if (bookStore.openBook && store.workbench === 'bookings' && bookStore.openBook.id) {
            path = path + bookStore.openBook.id
        } 
        if (path !== window.location.pathname)
                window.history.pushState(null, null, path)
    })

}