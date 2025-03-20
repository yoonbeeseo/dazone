import { useState, useRef, useCallback, useTransition } from "react";
import { Form, TextInput, TextInputRef } from "../../ui";
import FileItem from "./FileItem";
import Loading from "../../shared/Loading";
import { storage } from "../../lib/firebase";
import { v4 } from "uuid";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import useProductQuery from "../../lib/query.related/product.query";

const initialState: ProductProps = {
  name: "상품1",
  desc: "상품 내용은 ㄹ민아러미ㅏㄴㅇ러ㅣ만ㅇ러ㅣ만ㅇ러합니다.",
  id: "",
  imgs: [],
  price: 500001,
  quan: 1,
};

const AddProduct = (user: User) => {
  const [product, setProduct] = useState(initialState);

  const { desc, name, price, quan } = product;

  const onChange = useCallback(
    (target: keyof ProductProps, value: any) =>
      setProduct((prev) => ({ ...prev, [target]: value })),
    []
  );

  const nameRef = useRef<TextInputRef>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<TextInputRef>(null);
  const quanRef = useRef<TextInputRef>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);

  const onChangeFiles = useCallback(
    (items: FileList) => {
      for (const file of items) {
        const found = files.find(
          (item) =>
            item.name === file.name &&
            item.size === file.size &&
            item.type === file.type
        );
        if (found) {
          return alert("이미 추가된 파일입니다.");
        }
        setFiles((prev) => [...prev, file]);
      }
    },
    [files]
  );

  const [isPending, startTransition] = useTransition();

  const { addProduct } = useProductQuery(user);
  const onSubmit = useCallback(() => {
    if (name.length === 0) {
      alert("상품 이름을 입력해주세요.");
      return nameRef.current?.focus();
    }
    if (desc.length === 0) {
      alert("상품을 설명해주세요.");
      return descRef.current?.focus();
    }
    if (price.length === 0) {
      alert("상품 가격을 입력해주세요.");
      return priceRef.current?.focus();
    }
    const regex = /^[0-9]+$/;
    if (!regex.test(price)) {
      alert("숫자만 입력해주세요.");
      return priceRef.current?.focus();
    }

    if (files.length === 0) {
      alert("최소 1개의 상품 이미지를 등록해주세요.");
      return setTimeout(() => {
        imgRef.current?.click();
      }, 300);
    }

    startTransition(async () => {
      try {
        const imgUrls: string[] = [];

        for (const file of files) {
          const imgRef = storage.ref(`${user.uid}/products/${v4()}`);
          await uploadBytes(imgRef, file);
          const url = await getDownloadURL(imgRef);
          imgUrls.push(url);
        }

        const id = v4();

        const newProduct: ProductProps = {
          ...product,
          id,
          imgs: imgUrls,
          uid: user.uid,
        };

        const { message, success } = await addProduct(newProduct);
        if (!success) {
          return alert(message);
        }

        alert("상품이 등록되었습니다.");

        setProduct(initialState);
        setFiles([]);
      } catch (error: any) {
        return alert(error.message);
      }
    });
  }, [name, desc, price, files, user, product, addProduct]);

  return (
    <Form className="relative" onSubmit={onSubmit}>
      {isPending && (
        <Loading className="absolute h-full" message="상품 등록중..." />
      )}
      <TextInput
        value={name}
        id="name"
        onChangeText={(name) => onChange("name", name)}
        ref={nameRef}
        label="상품이름"
        placeholder="박보검이 사인한 책"
      />
      <div className="ti-con">
        <label htmlFor="desc" className="ti-l">
          상품설명
        </label>
        <textarea
          id="desc"
          value={desc}
          onChange={(e) => onChange("desc", e.target.value)}
          className="ti-i h-25 resize-none [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-b dark:[&::-webkit-scrollbar-track]:bg-darkBorder [&::-webkit-scrollbar-thumb]:bg-theme hover:[&::-webkit-scrollbar-thumb]:cursor-pointer [&::-webkit-scrollbar-thumb]:rounded py-2.5"
          ref={descRef}
          placeholder="여기에 상품설명을 입력하세요"
        />
      </div>
      <TextInput
        value={price}
        id="price"
        onChangeText={(price) => onChange("price", price)}
        ref={priceRef}
        label="상품가격"
        placeholder="10,000원"
        type="number"
        props={{ min: 0 }}
      />

      <TextInput
        value={quan}
        id="quan"
        onChangeText={(quan) => onChange("quan", quan)}
        ref={quanRef}
        label="상품재고"
        type="number"
        props={{
          min: 1,
        }}
      />

      <div className="ti-con">
        <label htmlFor="img" className="ti-l">
          상품이미지
        </label>
        <ul className="flex flex-wrap gap-2.5">
          {files.map((file) => (
            <li key={file.name}>
              <FileItem
                file={file}
                onDelete={() =>
                  setFiles((prev) =>
                    prev.filter((item) => item.name !== file.name)
                  )
                }
              />
            </li>
          ))}
          <li>
            <FileItem ref={imgRef} onChangeFiles={onChangeFiles} />
          </li>
        </ul>
      </div>
      <button className="btn mt-5">상품등록</button>
    </Form>
  );
};

export default AddProduct;
