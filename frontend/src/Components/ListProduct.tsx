import { Table } from "flowbite-react";
import { useGetProductBySellerQuery } from "../slices/productApiSlice";
import { useEffect, useState } from "react";
import { IProduct } from "../interfaces/product";
import SpinnerComponent from "./SpinnerComponent";

const ListProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { data, isLoading } = useGetProductBySellerQuery(1);

  useEffect(() => {
    if (data?.products) setProducts(data.products);
  }, [data]);

  return (
    <div className='overflow-x-auto h-full'>
      {isLoading ? (
        <SpinnerComponent />
      ) : (
        <Table hoverable>
          <Table.Head className='text-md'>
            <Table.HeadCell>Product Name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Stock</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {products.map((p, index) => (
              <Table.Row key={index} className='bg-white'>
                <Table.Cell className='whitespace-nowrap font-medium'>
                  {p.name}
                </Table.Cell>
                <Table.Cell>{p.category}</Table.Cell>
                <Table.Cell>R{p.price.toFixed(2)}</Table.Cell>
                <Table.Cell>{p.stock}</Table.Cell>
                <Table.Cell>
                  <a
                    href='#'
                    className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                  >
                    Edit
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export default ListProducts;
