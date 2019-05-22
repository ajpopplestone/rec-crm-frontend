const columns = {
    company: [{
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    }, {
        title: 'Candidate',
        dataIndex: 'candidate',
        key: 'candidate',
        sorter: (a, b) => a.surname.localeCompare(b.surname)
    }, {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        sorter: (a, b) => a.role.localeCompare(b.role)
    }], 
    candidates: [{
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    }, {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
        sorter: (a, b) => a.company.localeCompare(b.company)
    }, {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        sorter: (a, b) => a.role.localeCompare(b.role)
    }]
}

export default columns