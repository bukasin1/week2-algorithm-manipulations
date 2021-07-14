//const { noOfGroups } = require("../fixtures/outputs/output");

/**
 * This is the entry point to the program
 * Question 1 - Classifier
 *
 * @param {any} input Array of student objects
 */
 const input = [
    {
      name: 'Hendrick',
      dob: '1853-07-18T00:00:00.000Z',
      regNo: '041',
    },
    {
      name: 'Albert',
      dob: '1879-03-14T00:00:00.000Z',
      regNo: '033',
    },
    {
      name: 'Marie',
      dob: '1867-11-07T00:00:00.000Z',
      regNo: '024',
    },
    {
      name: 'Neils',
      dob: '1885-10-07T00:00:00.000Z',
      regNo: '02',
    },
    {
      name: 'Max',
      dob: '1858-04-23T00:00:00.000Z',
      regNo: '014',
    },
    {
      name: 'Erwin',
      dob: '1887-08-12T00:00:00.000Z',
      regNo: '09',
    },
    {
      name: 'Auguste',
      dob: '1884-01-28T00:00:00.000Z',
      regNo: '08',
    },
    {
      name: 'Karl',
      dob: '1901-12-05T00:00:00.000Z',
      regNo: '120',
    },
    {
      name: 'Louis', //
      dob: '1892-08-15T00:00:00.000Z',
      regNo: '022',
    },
    {
      name: 'Arthur',
      dob: '1892-09-10T00:00:00.000Z',
      regNo: '321',
    },
    {
      name: 'Paul',
      dob: '1902-08-08T00:00:00.000Z',
      regNo: '055',
    },
    {
      name: 'William',
      dob: '1890-03-31T00:00:00.000Z',
      regNo: '013',
    },
    {
      name: 'Owen',
      dob: '1879-04-26T00:00:00.000Z',
      regNo: '052',
    },
    {
      name: 'Martin',
      dob: '1871-02-15T00:00:00.000Z',
      regNo: '063',
    },
    {
      name: 'Guye',
      dob: '1866-10-15T00:00:00.000Z',
      regNo: '084',
    },
    {
      name: 'Charles',
      dob: '1868-02-14T00:00:00.000Z',
      regNo: '091',
    },
  ];


function classifier(input) {
    //Check to make sure provided input is an array.
    if(!Array.isArray(input)){
        throw new Error('Input not valid')
    }
    //copy the input data, to avoid mutating the main data.
    inputData = [...input]
    inputData.map(person => {
        let dob = new Date(person.dob)
        let date = new Date(2019, 0, 1)
        person['age'] = date.getFullYear()-dob.getFullYear()
        return person
    })
    inputData.sort((a,b) => {
        return a.age-b.age
    })
    let groupCount = 0, grouped = []
    // console.log(inputData[0] === inputData[0])
    // console.log([1,2] + 'we')

    //Using the array reduce method, process the data and generate desired output at once.
    let output = inputData.reduce((output,person,index) => {

        if(!grouped.includes(person)){
            groupCount++
            let filter = inputData.slice(index).filter(item => {
                return (item.age - person.age) <= 5 && -5<= (item.age - person.age)
            })
            let group = filter.length > 3 ? filter.slice(0,3) : filter
            output['group'+groupCount] = {
                members:  group,
                oldest: group.length === 3 ? group[2].age : group.length === 2 ? group[1].age : group[0].age,
                sum: group.reduce((sum,person) => sum + person.age,0),
                regNos : group.map(person => +person.regNo).sort((a,b) => a-b)
            }
            grouped.push(...(group))
        }


        return output
    }, {noOfGroups : groupCount})
    output['noOfGroups'] = groupCount

    return output
}

console.log(classifier(input))
module.exports = classifier;
