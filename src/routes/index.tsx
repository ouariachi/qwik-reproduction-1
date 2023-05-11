import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DocumentHead, useNavigate } from '@builder.io/qwik-city';

import styles from "./styles.scss?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const nav = useNavigate();

  return (
    <main id='content'>
      <h1>¡Welcome!</h1>

      <div class="btn" onClick$={() => nav("login")}>
        Login
      </div>
    </main>
  );
});

export const head: DocumentHead = {
  title: 'Issue reproduction'
};
