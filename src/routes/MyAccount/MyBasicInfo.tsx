import { useRef, useState, useMemo, useCallback, useTransition } from "react";
import { Form, TextInput, TextInputRef } from "../../ui";
import Loading from "../../shared/Loading";
import { db, FBCollection } from "../../lib/firebase";
import { AUTH } from "../../contextApi";

const MyBasicInfo = (user: User) => {
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user?.address ?? "");

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isAddressEditing, setIsAddressEditing] = useState(false);

  const nameRef = useRef<TextInputRef>(null);
  const addressRef = useRef<TextInputRef>(null);

  const isNameDiff = useMemo(() => {
    if (name.length === 0) {
      return false;
    }

    if (name === user.name) {
      return false;
    }

    return true;
  }, [user.name, name]);

  const isAddrDiff = useMemo(() => {
    if (address.length === 0) {
      return false;
    }
    if (user.address === address) {
      return false;
    }

    return true;
  }, [user.address, address]);

  const [isPending, startTransition] = useTransition();

  const ref = useMemo(
    () => db.collection(FBCollection.USERS).doc(user?.uid),
    [user]
  );

  const { updateUser } = AUTH.use();
  const onChangeName = useCallback(
    () =>
      startTransition(async () => {
        try {
          if (name.length === 0) {
            return alert("이름을 입력해주세요.");
          }
          if (!isNameDiff) {
            return alert("변경사항이 없습니다.");
          }
          await ref.update({ name });

          updateUser("name", name);

          alert("이름이 수정되었습니다.");
          setIsNameEditing(false);
        } catch (error: any) {
          alert(error.message);
        }
      }),
    [ref, name, isNameDiff, updateUser]
  );

  const onChangeAddress = useCallback(
    () =>
      startTransition(async () => {
        if (address.length === 0) {
          alert("아무것도 입력되지 않았습니다.");
          return addressRef.current?.focus();
        }
        if (!isAddrDiff) {
          alert("변경사항이 없습니다.");
          return addressRef.current?.focus();
        }

        try {
          await ref.update({ address });
          updateUser("address", address);

          alert("주소가 변경되었습니다.");
          setIsAddressEditing(false);
        } catch (error: any) {
          return alert(error.message);
        }
      }),
    [ref, address, isAddrDiff, updateUser]
  );

  return (
    <div className="h-full relative">
      {isPending && <Loading className="absolute h-full" />}
      {!isNameEditing ? (
        <button
          className="font-black text-2xl hover:shadow-none hover:bg-bg dark:hover:bg-darkBorder"
          onClick={() => {
            setIsNameEditing(true);
            nameRef.current?.focus();
          }}
        >
          Hi, {user.name}
        </button>
      ) : (
        <Form
          className="flex-row gap-x-2.5 items-end max-w-100"
          onSubmit={onChangeName}
        >
          <div className="flex-1">
            <TextInput
              id="name"
              label="이름"
              onChangeText={setName}
              ref={nameRef}
              value={name}
              placeholder={user.name}
            />
          </div>
          <button
            type="button"
            className="bg-bg dark:bg-darkBorder"
            onClick={() => {
              setName(user.name);
              setIsNameEditing(false);
            }}
          >
            취소
          </button>
          {isNameDiff && <button className="btn rounded-sm">저장</button>}
        </Form>
      )}
      <p className="text-xl font-light px-2.5">{user.email}</p>
      <button
        className="text-sm text-gray-500 hover:shadow-none hover:bg-bg dark:hover:bg-darkBorder"
        onClick={() => alert("uid copied")}
      >
        {user.uid}
      </button>
      {!isAddressEditing ? (
        <button
          className="bg-bg dark:bg-darkBorder"
          onClick={() => {
            setIsAddressEditing(true);
            setTimeout(() => {
              addressRef.current?.focus();
            }, 100);
          }}
        >
          {user?.address ?? "주소를 입력해주세요."}
        </button>
      ) : (
        <Form className="max-w-100" onSubmit={onChangeAddress}>
          <TextInput
            ref={addressRef}
            id="address"
            label="주소"
            onChangeText={setAddress}
            value={address}
            placeholder="내가 살던 고향은"
          />
          <div className="flex gap-x-2.5 justify-end">
            <button
              type="button"
              className="bg-bg dark:bg-darkBorder"
              onClick={() => {
                setAddress(user?.address ?? "");
                setIsAddressEditing(false);
                // addressRef.current?.focus();
              }}
            >
              취소
            </button>
            {isAddrDiff && <button className="btn rounded-sm">저장</button>}
          </div>
        </Form>
      )}
    </div>
  );
};

export default MyBasicInfo;
