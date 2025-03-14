import { auth, db, FBCollection } from "../../lib/firebase";
import Loading from "../../shared/Loading";
import { AUTH } from "../context";
import { useState, useEffect, useCallback, PropsWithChildren } from "react";

const ref = db.collection(FBCollection.USERS);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [initialized, setInitialized] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const [user, setUser] = useState(AUTH.initialState.user);

  const fetchUser = useCallback(async (uid: string) => {
    // const snap = await ref.get();
    // const data = snap.docs.map(
    //   (doc) => ({ ...doc.data(), uid: doc.id } as User)
    // ); //! 많은 유저들을 한번에 불러올 때 씀 불러올 때는 컬렉션만 잡아서 씀
    const snap = await ref.doc(uid).get();
    const data = snap.data() as User | null;

    //! 한 명의 유저를 가져오는 법: doc에 해당 아이템의 아이디를 전달하면 됨

    if (!data) {
      alert("존재하지 않는 유저입니다.");
      return setUser(null);
    }
    setUser(data);
  }, []);

  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((fbUser) => {
      console.log(fbUser);
      if (fbUser) {
        console.log("fetch user data from database");
        fetchUser(fbUser.uid);
      } else {
        setUser(null);
      }
      setTimeout(() => {
        setInitialized(true);
        setIsPending(false);
      }, 1000);
    });

    subscribe;

    return subscribe;
  }, [fetchUser]);

  const signin = useCallback(
    async (email: string, password: string): Promise<PromiseResult> => {
      try {
        console.log("signin process started");
        setIsPending(true);

        const { user } = await auth.signInWithEmailAndPassword(email, password);
        if (user) {
          await fetchUser(user.uid);
        }
      } catch (error: any) {
        console.log(error);
        return { message: error.message };
      } finally {
        console.log("singin process done");
        setIsPending(false);
      }

      return { success: true };
    },
    [fetchUser]
  );
  return (
    <AUTH.context.Provider value={{ initialized, isPending, user, signin }}>
      {!initialized || isPending ? (
        <Loading>
          <h1 className="text-[100px] font-black text-theme">대존</h1>
        </Loading>
      ) : (
        children
      )}
    </AUTH.context.Provider>
  );
};

export default AuthProvider;
