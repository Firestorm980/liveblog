/* global wp,  tinymce, jQuery */
/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';

export const getTinyMCEContent = () => {
  const currentEditor = tinymce.activeEditor;
  const $textField = jQuery(`#${currentEditor.id}`);
  if ($textField.is(':visible')) {
    return $textField.val();
  }

  return currentEditor ? currentEditor.getContent() : '';
};

export const clearTinyMCEContent = () => {
  const currentEditor = tinymce.activeEditor;
  const $textField = jQuery(`#${currentEditor.id}`);
  $textField.val('');
  currentEditor.setContent('');
};

export const clearAuthors = () => {
  if (tinymce.activeEditor.clearAuthors) {
    tinymce.activeEditor.clearAuthors();
  }
};

export const clearHeadline = () => {
  if (tinymce.activeEditor.clearHeadline) {
    tinymce.activeEditor.clearHeadline();
  }
};

class TinyMCEEditor extends Component {
  constructor(props) {
    super(props);
    this.containerId = `live-editor-${Math.floor(Math.random() * 100000)}`;
    this.editorSettings = window.liveblog_settings.editorSettings;
    setTimeout(() => { // wait for load
      wp.editor.initialize(this.containerId, this.editorSettings);
      setTimeout(() => {
        const stateContent = this.props.rawText;
        tinymce.activeEditor.clearAuthors = this.props.clearAuthors;
        tinymce.activeEditor.clearHeadline = this.props.clearHeadline;
        tinymce.activeEditor.setError = this.props.setError;
        tinymce.activeEditor.isError = false;
        if (stateContent && stateContent !== '' && stateContent !== '<p></p>') {
          tinymce.activeEditor.setContent(stateContent);
        }
        tinymce.activeEditor.focus(); // Set focus to active editor
      }, 250);
    }, 10);
  }

  componentDidUpdate() {
    const thisError = this.props.editorContainer.props.api.error;
    /*
    could have used prevProps here to check error in previous props
    but somehow both previous and current props are same
    Using `isError` for current editor, we can prevent infinite loop
     */
    if (thisError && tinymce.activeEditor.setError && !tinymce.activeEditor.isError) {
      tinymce.activeEditor.setError(true, this.props.editorContainer.props.api.errorMessage);
      tinymce.activeEditor.isError = true;
      setTimeout(() => {
        tinymce.activeEditor.setError(false, this.props.editorContainer.props.api.errorMessage);
        tinymce.activeEditor.isError = false;
      }, 500);
    }
  }

  render() {
    return <textarea className="liveblog-editor-textarea" id={this.containerId} />;
  }
}

export default TinyMCEEditor;
