import { $, component$, useSignal, useStylesScoped$, useVisibleTask$ } from "@builder.io/qwik";
import { DocumentHead, routeAction$ } from "@builder.io/qwik-city";

import styles from "./styles.scss?inline"

export const useLogin = routeAction$(async (/* data, req */) => {
  /**
   * Magic will be here 🪄 
   */

  return {
    success: true,
    user: {foo: "bar"}, 
    token: {foo: "bar"}
  }
});

export default component$(() => {
  useStylesScoped$(styles);

  const data = useSignal({ email: "", password: "" });
  const loginAction = useLogin();
  
  useVisibleTask$(({ track }) => {
    track(() => data.value);

    if(!data.value.email || !data.value.password) return;

    loginAction.submit(data.value).then(({ value }) => {
      if (!value.success || !value.token || !value.user) return;

      /*
      
      session.value = {
        authorized: true,
        user: value.user,
        token: value.token
      };
  
      localStorage.setItem("session", JSON.stringify(session.value));
      
      */
    })
  });
  
  const onSumbit = $(() => {
    const email = (document.getElementById("emailInp") as HTMLInputElement).value;
    const password = (document.getElementById("passInp") as HTMLInputElement).value;
    data.value = { email, password }
  });

  return (
    <div class="content">
        <h1>Login</h1>

        {loginAction.value?.success && (
          <span class="msgSuccess">Logged in</span>
        )}

        {/* {loginAction.value?.failed && (
          <span class="msgError">
            <div>{loginAction.value?.error}</div>
            <div>{loginAction.value.fieldErrors?.email}</div>
            <div>{loginAction.value.fieldErrors?.password}</div>
          </span>
        )} */}

        <div class="form">
          <div class="inputGroup">
            <input value="test@test.com" type="email" name="email" id="emailInp" required/>
            <label for="emailInp">Email:</label>
          </div>

          <div class="inputGroup">
            <input value="12345678" type="password" name="password" id="passInp" required/>
            <label for="passInp">Password:</label>
          </div>

          <button type="button" onClick$={onSumbit}>Submit</button>
        </div>
      </div>
  )
});

export const head: DocumentHead = {
  title: 'Sign in'
};
