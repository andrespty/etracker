import React from 'react'
import { Box, Center, Spacer, Text, Flex } from '@chakra-ui/react'
import BarGraph from '../../Components/BarGraph'
import { useCategories } from '../../Store/hooks/useCategories'
import { useExpenses } from '../../Store/hooks/useExpenses'
import type { ChartOptions, ChartData } from 'chart.js'
import MonthPicker from '../../Components/MonthPicker'
import YearPicker from '../../Components/YearPicker'

function Categories() {

    const { categories } = useCategories()
    const { expenses, setState } = useExpenses()

    console.log(categories)
    console.log(expenses)

    const data = (): ChartData<'bar'> => {
        let data_list: number[] = []
        categories.forEach((category, index) => {

            let count = 0;
            expenses.expenses.forEach((expense) => {
                if (expense.categories.some(cat => cat.id === category.id)){
                    count += expense.amount
                }
            })
            data_list.push(count)
        })

        return {
            labels: categories.map((category) => category.name),
            datasets: [{
                data: data_list,
                backgroundColor: categories.map((category) => category.bgColor)
            }]
        }
    }

    const options: ChartOptions<'bar'> = {
        scales:{
            y:{
                ticks: {
                    callback: function(value) {
                        return '$ ' + value;
                    }
                }
            }
        },
        plugins: {
            legend:{
                display:false
            },
            tooltip: {
                usePointStyle: true,
                callbacks: {
                    label: (context) => {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        }
    }

    return (
        <Center
            mt={5}
            p={2}
            flexDir='column'
        >
            
            <Center gap={3}>
                <MonthPicker onChange={(month:number) => setState({month})} />
                
                <YearPicker onChange={(year:number) => setState({year})} />
            </Center>
            
            <Box w={'50%'} >

                <BarGraph data={data()} options={options} />
           
            </Box>

            <Box>

                {
                    categories.map((category, key) => (
                        <Box 
                            minW={100}
                            w='350px'
                            borderWidth='1px'
                            borderRadius='lg'
                            p={3}
                            my={2}
                        >
                            <Flex alignItems={'center'}>
                                <Text>
                                    {category.name}
                                </Text>
                                <Spacer/>
                                <Text
                                    mr={3}
                                >
                                    {`$${data().datasets[0].data[key].toFixed(2)}`}
                                </Text>
                                <Text 
                                    fontSize={'sm'}
                                    color='gray.500'
                                >
                                    {((data().datasets[0].data[key]/expenses.total)*100).toFixed(0)}% 
                                </Text>
                            </Flex>
                        </Box>
                    ))
                }

            </Box>



        </Center>
    )
}

export default Categories

// const data = {
//     labels: ['October'],
//     datasets: [
//         {
//             label: 'Category 1',
//             data: [32.40],
//             backgroundColor: 'rgba(255, 99, 132, 0.5)'
//         },
//         {
//             label: 'Category 2',
//             data: [43.20],
//             backgroundColor: 'rgba(255, 99, 132, 0.5)'
//         },
//         {
//             label: 'Category 3',
//             data: [21.22],
//             backgroundColor: 'rgba(255, 99, 132, 0.5)'
//         }
//     ]
// }