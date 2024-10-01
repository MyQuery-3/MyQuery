export default function page() {
    return (
      <main className="">
        <div className=" grid grid-flow-col">
          <div>
            <div className="m-5 mx-[100px] p-2 min-h-[300px] rounded-md bg-[#cbcbcb]">
              <textarea className="w-full min-h-[300px] p-5 text-lg rounded-md" />
            </div>
            <div id="result" className=" bg-[#cbcbcb] rounded-md m-10">
              <p className="text-2xl font-bold ml-3 mt-3">Database</p>
              <div className="p-10">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                  <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Stock
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-neutral-600">
                      <th scope="row" className="px-6 py-4">
                        Handbag
                      </th>
                      <td className="px-6 py-4">$129.99</td>
                      <td className="px-6 py-4">30</td>
                      <td className="px-6 py-4">In Stock</td>
                    </tr>
                    <tr className="border-b dark:border-neutral-600">
                      <th scope="row" className="px-6 py-4">
                        Shoes
                      </th>
                      <td className="px-6 py-4">$89.50</td>
                      <td className="px-6 py-4">25</td>
                      <td className="px-6 py-4">In Stock</td>
                    </tr>
  
                    <tr className="border-b dark:border-neutral-600">
                      <th scope="row" className="px-6 py-4">
                        Bedding Set
                      </th>
                      <td className="px-6 py-4">$69.99</td>
                      <td className="px-6 py-4">40</td>
                      <td className="px-6 py-4">In Stock</td>
                    </tr>
                    <tr className="border-b dark:border-neutral-600">
                      <th scope="row" className="px-6 py-4">
                        Dining Table
                      </th>
                      <td className="px-6 py-4">$449.99</td>
                      <td className="px-6 py-4">5</td>
                      <td className="px-6 py-4">In Stock</td>
                    </tr>
                    <tr className="border-b dark:border-neutral-600">
                      <th scope="row" className="px-6 py-4">
                        Soap Set
                      </th>
                      <td className="px-6 py-4">$24.95</td>
                      <td className="px-6 py-4">50</td>
                      <td className="px-6 py-4">In Stock</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
  
          <div className="bg-[#cbcbcb] my-10 mr-10 rounded-md">
            <p className=" text-center mt-3 text-2xl font-blod">SETTING</p>
          </div>
        </div>
      </main>
    );
  }
  