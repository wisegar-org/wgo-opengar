using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace GraphQLCodeGen {
  public class Types {
    
    #region AgvContentsInput
    public class AgvContentsInput {
      #region members
      [Required]
      [JsonRequired]
      public string contents { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region AGVContentsResponse
    public class AGVContentsResponse {
      #region members
      [JsonProperty("contents")]
      public string contents { get; set; }
      #endregion
    }
    #endregion
    
    #region AgvEventFilterInput
    public class AgvEventFilterInput {
      #region members
      public string @class { get; set; }
    
      public string enrollment { get; set; }
    
      public string state { get; set; }
    
      public string title { get; set; }
    
      public string type { get; set; }
    
      public string visible { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region AGVEventGetNextsResponse
    public class AGVEventGetNextsResponse {
      #region members
      [JsonProperty("corso")]
      public AGVEventResponse corso { get; set; }
    
      [JsonProperty("evento")]
      public AGVEventResponse evento { get; set; }
      #endregion
    }
    #endregion
    
    #region AGVEventGetPageResponse
    public class AGVEventGetPageResponse {
      #region members
      [JsonProperty("count")]
      public double count { get; set; }
    
      [JsonProperty("events")]
      public List<AGVEventResponse> events { get; set; }
      #endregion
    }
    #endregion
    
    #region AgvEventInput
    public class AgvEventInput {
      #region members
      [Required]
      [JsonRequired]
      public string @class { get; set; }
    
      [Required]
      [JsonRequired]
      public string description { get; set; }
    
      public any endDate { get; set; }
    
      [Required]
      [JsonRequired]
      public bool enrollment { get; set; }
    
      [Required]
      [JsonRequired]
      public double id { get; set; }
    
      public List<int> imgList { get; set; }
    
      public int? imgTitle { get; set; }
    
      public string shortDescription { get; set; }
    
      public any startDate { get; set; }
    
      [Required]
      [JsonRequired]
      public string state { get; set; }
    
      [Required]
      [JsonRequired]
      public string title { get; set; }
    
      [Required]
      [JsonRequired]
      public string type { get; set; }
    
      [Required]
      [JsonRequired]
      public bool visible { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region AgvEventPageInput
    public class AgvEventPageInput {
      #region members
      [Required]
      [JsonRequired]
      public bool descending { get; set; }
    
      public AgvEventFilterInput filter { get; set; }
    
      [Required]
      [JsonRequired]
      public double skip { get; set; }
    
      [Required]
      [JsonRequired]
      public string sortBy { get; set; }
    
      [Required]
      [JsonRequired]
      public double take { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region AGVEventResponse
    public class AGVEventResponse {
      #region members
      [JsonProperty("class")]
      public string @class { get; set; }
    
      [JsonProperty("description")]
      public string description { get; set; }
    
      [JsonProperty("endDate")]
      public any endDate { get; set; }
    
      [JsonProperty("enrollment")]
      public bool enrollment { get; set; }
    
      [JsonProperty("id")]
      public double id { get; set; }
    
      [JsonProperty("imgList")]
      public List<MediaResponse> imgList { get; set; }
    
      [JsonProperty("imgTitle")]
      public MediaResponse imgTitle { get; set; }
    
      [JsonProperty("inscriptions")]
      public double inscriptions { get; set; }
    
      [JsonProperty("shortDescription")]
      public string shortDescription { get; set; }
    
      [JsonProperty("startDate")]
      public any startDate { get; set; }
    
      [JsonProperty("state")]
      public string state { get; set; }
    
      [JsonProperty("title")]
      public string title { get; set; }
    
      [JsonProperty("type")]
      public string type { get; set; }
    
      [JsonProperty("visible")]
      public bool visible { get; set; }
      #endregion
    }
    #endregion
    
    #region AGVInscriptionAddResponse
    public class AGVInscriptionAddResponse {
      #region members
      [JsonProperty("create")]
      public bool? create { get; set; }
    
      [JsonProperty("error")]
      public bool? error { get; set; }
    
      [JsonProperty("exist")]
      public bool? exist { get; set; }
      #endregion
    }
    #endregion
    
    #region AgvInscriptionFilterInput
    public class AgvInscriptionFilterInput {
      #region members
      public string @class { get; set; }
    
      public string email { get; set; }
    
      public string eventClass { get; set; }
    
      public string eventTitle { get; set; }
    
      public string nome { get; set; }
    
      public string phone { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region AGVInscriptionGetPageResponse
    public class AGVInscriptionGetPageResponse {
      #region members
      [JsonProperty("count")]
      public double count { get; set; }
    
      [JsonProperty("inscriptions")]
      public List<AGVInscriptionResponse> inscriptions { get; set; }
      #endregion
    }
    #endregion
    
    #region AgvInscriptionInput
    public class AgvInscriptionInput {
      #region members
      [Required]
      [JsonRequired]
      public string @class { get; set; }
    
      [Required]
      [JsonRequired]
      public string cognome { get; set; }
    
      [Required]
      [JsonRequired]
      public string email { get; set; }
    
      [Required]
      [JsonRequired]
      public int eventId { get; set; }
    
      [Required]
      [JsonRequired]
      public double id { get; set; }
    
      [Required]
      [JsonRequired]
      public string message { get; set; }
    
      [Required]
      [JsonRequired]
      public string nome { get; set; }
    
      [Required]
      [JsonRequired]
      public string phone { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region AgvInscriptionPageInput
    public class AgvInscriptionPageInput {
      #region members
      [Required]
      [JsonRequired]
      public bool descending { get; set; }
    
      public AgvInscriptionFilterInput filter { get; set; }
    
      [Required]
      [JsonRequired]
      public double skip { get; set; }
    
      [Required]
      [JsonRequired]
      public string sortBy { get; set; }
    
      [Required]
      [JsonRequired]
      public double take { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region AGVInscriptionResponse
    public class AGVInscriptionResponse {
      #region members
      [JsonProperty("class")]
      public string @class { get; set; }
    
      [JsonProperty("cognome")]
      public string cognome { get; set; }
    
      [JsonProperty("date")]
      public any date { get; set; }
    
      [JsonProperty("email")]
      public string email { get; set; }
    
      [JsonProperty("event")]
      public AGVEventResponse @event { get; set; }
    
      [JsonProperty("eventClass")]
      public string eventClass { get; set; }
    
      [JsonProperty("eventId")]
      public double eventId { get; set; }
    
      [JsonProperty("eventTitle")]
      public string eventTitle { get; set; }
    
      [JsonProperty("id")]
      public double id { get; set; }
    
      [JsonProperty("message")]
      public string message { get; set; }
    
      [JsonProperty("nome")]
      public string nome { get; set; }
    
      [JsonProperty("phone")]
      public string phone { get; set; }
      #endregion
    }
    #endregion
    
    #region AGVNewsletterGetInscriptionResponse
    public class AGVNewsletterGetInscriptionResponse {
      #region members
      [JsonProperty("inscription")]
      public AGVNewsletterInscriptionResponse inscription { get; set; }
      #endregion
    }
    #endregion
    
    #region AGVNewsletterGetMessagesResponse
    public class AGVNewsletterGetMessagesResponse {
      #region members
      [JsonProperty("message")]
      public AGVNewsletterMessageResponse message { get; set; }
      #endregion
    }
    #endregion
    
    #region AgvNewsletterInscriptionFilterInput
    public class AgvNewsletterInscriptionFilterInput {
      #region members
      public string email { get; set; }
    
      public string status { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region AgvNewsletterInscriptionInput
    public class AgvNewsletterInscriptionInput {
      #region members
      [Required]
      [JsonRequired]
      public string email { get; set; }
    
      public double? id { get; set; }
    
      [Required]
      [JsonRequired]
      public string status { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region AgvNewsletterInscriptionPageInput
    public class AgvNewsletterInscriptionPageInput {
      #region members
      [Required]
      [JsonRequired]
      public bool descending { get; set; }
    
      public AgvNewsletterInscriptionFilterInput filter { get; set; }
    
      [Required]
      [JsonRequired]
      public double skip { get; set; }
    
      [Required]
      [JsonRequired]
      public string sortBy { get; set; }
    
      [Required]
      [JsonRequired]
      public double take { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region AGVNewsletterInscriptionResponse
    public class AGVNewsletterInscriptionResponse {
      #region members
      [JsonProperty("email")]
      public string email { get; set; }
    
      [JsonProperty("id")]
      public double? id { get; set; }
    
      [JsonProperty("status")]
      public string status { get; set; }
      #endregion
    }
    #endregion
    
    #region AgvNewsletterInscriptionSendEmailStatusInput
    public class AgvNewsletterInscriptionSendEmailStatusInput {
      #region members
      [Required]
      [JsonRequired]
      public List<string> emails { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region AGVNewsletterInscriptionsPageResponse
    public class AGVNewsletterInscriptionsPageResponse {
      #region members
      [JsonProperty("count")]
      public double count { get; set; }
    
      [JsonProperty("inscriptions")]
      public List<AGVNewsletterInscriptionResponse> inscriptions { get; set; }
      #endregion
    }
    #endregion
    
    #region AgvNewsletterMessageFilterInput
    public class AgvNewsletterMessageFilterInput {
      #region members
      public string status { get; set; }
    
      public string title { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region AgvNewsletterMessageInput
    public class AgvNewsletterMessageInput {
      #region members
      public double? id { get; set; }
    
      [Required]
      [JsonRequired]
      public string message { get; set; }
    
      public string status { get; set; }
    
      [Required]
      [JsonRequired]
      public string title { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region AgvNewsletterMessagePageInput
    public class AgvNewsletterMessagePageInput {
      #region members
      [Required]
      [JsonRequired]
      public bool descending { get; set; }
    
      public AgvNewsletterMessageFilterInput filter { get; set; }
    
      [Required]
      [JsonRequired]
      public double skip { get; set; }
    
      [Required]
      [JsonRequired]
      public string sortBy { get; set; }
    
      [Required]
      [JsonRequired]
      public double take { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region AGVNewsletterMessageResponse
    public class AGVNewsletterMessageResponse {
      #region members
      [JsonProperty("id")]
      public double? id { get; set; }
    
      [JsonProperty("message")]
      public string message { get; set; }
    
      [JsonProperty("status")]
      public string status { get; set; }
    
      [JsonProperty("title")]
      public string title { get; set; }
      #endregion
    }
    #endregion
    
    #region AGVNewsletterMessagesPageResponse
    public class AGVNewsletterMessagesPageResponse {
      #region members
      [JsonProperty("count")]
      public double count { get; set; }
    
      [JsonProperty("messages")]
      public List<AGVNewsletterMessageResponse> messages { get; set; }
      #endregion
    }
    #endregion
    
    #region ContactMeInput
    public class ContactMeInput {
      #region members
      public string address { get; set; }
    
      public string contactName { get; set; }
    
      public string email { get; set; }
    
      public string mapPath { get; set; }
    
      public string phoneNumber { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region ContactMeResponse
    public class ContactMeResponse {
      #region members
      [JsonProperty("address")]
      public string address { get; set; }
    
      [JsonProperty("contactName")]
      public string contactName { get; set; }
    
      [JsonProperty("email")]
      public string email { get; set; }
    
      [JsonProperty("mapPath")]
      public string mapPath { get; set; }
    
      [JsonProperty("phoneNumber")]
      public string phoneNumber { get; set; }
      #endregion
    }
    #endregion
    
    #region DeleteTranslationInput
    public class DeleteTranslationInput {
      #region members
      [Required]
      [JsonRequired]
      public string key { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region EditUserInput
    public class EditUserInput {
      #region members
      public string address { get; set; }
    
      public string cap { get; set; }
    
      public string certificate { get; set; }
    
      [Required]
      [JsonRequired]
      public string code { get; set; }
    
      [Required]
      [JsonRequired]
      public string email { get; set; }
    
      [Required]
      [JsonRequired]
      public double id { get; set; }
    
      public bool? isEmailConfirmed { get; set; }
    
      [Required]
      [JsonRequired]
      public string lastName { get; set; }
    
      [Required]
      [JsonRequired]
      public string name { get; set; }
    
      [Required]
      [JsonRequired]
      public string password { get; set; }
    
      public string phone { get; set; }
    
      public List<string> roles { get; set; }
    
      [Required]
      [JsonRequired]
      public string userName { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region Email
    public class Email {
      #region members
      [JsonProperty("body")]
      public string body { get; set; }
    
      [JsonProperty("from")]
      public string from { get; set; }
    
      [JsonProperty("subject")]
      public string subject { get; set; }
    
      [JsonProperty("to")]
      public string to { get; set; }
      #endregion
    }
    #endregion
    
    #region EmailFromToAppInput
    public class EmailFromToAppInput {
      #region members
      [Required]
      [JsonRequired]
      public string body { get; set; }
    
      public string data { get; set; }
    
      [Required]
      [JsonRequired]
      public string subject { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region EmailInput
    public class EmailInput {
      #region members
      [Required]
      [JsonRequired]
      public string body { get; set; }
    
      public string data { get; set; }
    
      [Required]
      [JsonRequired]
      public string from { get; set; }
    
      [Required]
      [JsonRequired]
      public string subject { get; set; }
    
      [Required]
      [JsonRequired]
      public string to { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region EmailResponse
    public class EmailResponse {
      #region members
      [JsonProperty("error")]
      public string error { get; set; }
    
      [JsonProperty("isSuccess")]
      public bool isSuccess { get; set; }
    
      [JsonProperty("message")]
      public string message { get; set; }
    
      [JsonProperty("result")]
      public Email result { get; set; }
      #endregion
    }
    #endregion
    
    #region EmailToAddressAndAppInput
    public class EmailToAddressAndAppInput {
      #region members
      [Required]
      [JsonRequired]
      public string body { get; set; }
    
      public string data { get; set; }
    
      [Required]
      [JsonRequired]
      public string subject { get; set; }
    
      [Required]
      [JsonRequired]
      public string to { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region EmailToAppInput
    public class EmailToAppInput {
      #region members
      [Required]
      [JsonRequired]
      public string body { get; set; }
    
      public string data { get; set; }
    
      [Required]
      [JsonRequired]
      public string from { get; set; }
    
      [Required]
      [JsonRequired]
      public string subject { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region ExportTranslationInput
    public class ExportTranslationInput {
      #region members
      public List<double> languagesId { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region GetAllTranslationInput
    public class GetAllTranslationInput {
      #region members
      [Required]
      [JsonRequired]
      public double languageId { get; set; }
    
      public string search { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region GetTranslationByKeysInput
    public class GetTranslationByKeysInput {
      #region members
      [Required]
      [JsonRequired]
      public List<string> keys { get; set; }
    
      [Required]
      [JsonRequired]
      public double languageId { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region HistoricFiltersResponse
    public class HistoricFiltersResponse {
      #region members
      [JsonProperty("actions")]
      public List<string> actions { get; set; }
    
      [JsonProperty("entities")]
      public List<string> entities { get; set; }
    
      [JsonProperty("usernames")]
      public List<string> usernames { get; set; }
      #endregion
    }
    #endregion
    
    #region HistoricPageFilterInput
    public class HistoricPageFilterInput {
      #region members
      public string action { get; set; }
    
      public string entity { get; set; }
    
      public string username { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region HistoricPageInput
    public class HistoricPageInput {
      #region members
      [Required]
      [JsonRequired]
      public bool descending { get; set; }
    
      public HistoricPageFilterInput filter { get; set; }
    
      [Required]
      [JsonRequired]
      public double skip { get; set; }
    
      [Required]
      [JsonRequired]
      public string sortBy { get; set; }
    
      [Required]
      [JsonRequired]
      public double take { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region HistoricPageResponse
    public class HistoricPageResponse {
      #region members
      [JsonProperty("count")]
      public double count { get; set; }
    
      [JsonProperty("histories")]
      public List<HistoricResponse> histories { get; set; }
      #endregion
    }
    #endregion
    
    #region HistoricResponse
    public class HistoricResponse {
      #region members
      [JsonProperty("action")]
      public string action { get; set; }
    
      [JsonProperty("creatoIl")]
      public any creatoIl { get; set; }
    
      [JsonProperty("entity")]
      public string entity { get; set; }
    
      [JsonProperty("id")]
      public double id { get; set; }
    
      [JsonProperty("message")]
      public string message { get; set; }
    
      [JsonProperty("modificatoIl")]
      public any modificatoIl { get; set; }
    
      [JsonProperty("snapshot")]
      public string snapshot { get; set; }
    
      [JsonProperty("userId")]
      public double userId { get; set; }
    
      [JsonProperty("username")]
      public string username { get; set; }
      #endregion
    }
    #endregion
    
    #region IdInput
    public class IdInput {
      #region members
      [Required]
      [JsonRequired]
      public double id { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region ImportTranslationsInput
    public class ImportTranslationsInput {
      #region members
      /// <summary>
      /// File uploaded
      /// </summary>
      public any file { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region LanguageInput
    public class LanguageInput {
      #region members
      [Required]
      [JsonRequired]
      public string code { get; set; }
    
      [Required]
      [JsonRequired]
      public bool @default { get; set; }
    
      [Required]
      [JsonRequired]
      public bool enabled { get; set; }
    
      [Required]
      [JsonRequired]
      public double id { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region LanguagePostInput
    public class LanguagePostInput {
      #region members
      [Required]
      [JsonRequired]
      public string code { get; set; }
    
      [Required]
      [JsonRequired]
      public bool @default { get; set; }
    
      [Required]
      [JsonRequired]
      public bool enabled { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region LanguageResponse
    public class LanguageResponse {
      #region members
      [JsonProperty("code")]
      public string code { get; set; }
    
      [JsonProperty("default")]
      public bool @default { get; set; }
    
      [JsonProperty("enabled")]
      public bool enabled { get; set; }
    
      [JsonProperty("id")]
      public double id { get; set; }
      #endregion
    }
    #endregion
    
    #region LocalStorageResponse
    public class LocalStorageResponse {
      #region members
      [JsonProperty("storage")]
      public string storage { get; set; }
      #endregion
    }
    #endregion
    
    #region LoginInput
    public class LoginInput {
      #region members
      [Required]
      [JsonRequired]
      public string password { get; set; }
    
      [Required]
      [JsonRequired]
      public string user { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region LoginResponse
    public class LoginResponse {
      #region members
      [JsonProperty("token")]
      public string token { get; set; }
    
      [JsonProperty("user")]
      public UserResponse user { get; set; }
      #endregion
    }
    #endregion
    
    #region MeInput
    public class MeInput {
      #region members
      [Required]
      [JsonRequired]
      public string token { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region MediaInput
    public class MediaInput {
      #region members
      /// <summary>
      /// File uploaded
      /// </summary>
      [Required]
      [JsonRequired]
      public any file { get; set; }
    
      /// <summary>
      /// Flag public file
      /// </summary>
      [Required]
      [JsonRequired]
      public bool isPublic { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region MediaResponse
    public class MediaResponse {
      #region members
      [JsonProperty("data")]
      public string data { get; set; }
    
      [JsonProperty("displayName")]
      public string displayName { get; set; }
    
      [JsonProperty("error")]
      public string error { get; set; }
    
      [JsonProperty("fileName")]
      public string fileName { get; set; }
    
      [JsonProperty("id")]
      public double? id { get; set; }
    
      [JsonProperty("isPublic")]
      public bool? isPublic { get; set; }
    
      [JsonProperty("mimetype")]
      public string mimetype { get; set; }
    
      [JsonProperty("url")]
      public string url { get; set; }
      #endregion
    }
    #endregion
    
    #region MediasInput
    public class MediasInput {
      #region members
      /// <summary>
      /// File uploaded
      /// </summary>
      [Required]
      [JsonRequired]
      public List<MediaInput> files { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region Mutation
    public class Mutation {
      #region members
      [JsonProperty("agvCreateEvent")]
      public bool agvCreateEvent { get; set; }
    
      [JsonProperty("agvCreateInscription")]
      public AGVInscriptionAddResponse agvCreateInscription { get; set; }
    
      [JsonProperty("agvDeleteNewsletterMessage")]
      public bool agvDeleteNewsletterMessage { get; set; }
    
      [JsonProperty("agvModifyContents")]
      public bool agvModifyContents { get; set; }
    
      [JsonProperty("agvModifyEvent")]
      public bool agvModifyEvent { get; set; }
    
      [JsonProperty("agvPostNewsletterInscription")]
      public bool agvPostNewsletterInscription { get; set; }
    
      [JsonProperty("agvPostNewsletterMessage")]
      public bool agvPostNewsletterMessage { get; set; }
    
      [JsonProperty("agvPutNewsletterInscription")]
      public bool agvPutNewsletterInscription { get; set; }
    
      [JsonProperty("agvPutNewsletterMessage")]
      public bool agvPutNewsletterMessage { get; set; }
    
      [JsonProperty("agvSendNewsletterMessage")]
      public bool agvSendNewsletterMessage { get; set; }
    
      [JsonProperty("agvZyncNewsletterInscriptions")]
      public bool agvZyncNewsletterInscriptions { get; set; }
    
      [JsonProperty("changeResetPassword")]
      public bool changeResetPassword { get; set; }
    
      [JsonProperty("clearLocalStorage")]
      public bool clearLocalStorage { get; set; }
    
      [JsonProperty("confirmRegist")]
      public bool confirmRegist { get; set; }
    
      [JsonProperty("deleteTranslation")]
      public bool deleteTranslation { get; set; }
    
      [JsonProperty("deleteUser")]
      public bool deleteUser { get; set; }
    
      [JsonProperty("editUser")]
      public UserResponse editUser { get; set; }
    
      [JsonProperty("importTranslations")]
      public bool importTranslations { get; set; }
    
      [JsonProperty("login")]
      public LoginResponse login { get; set; }
    
      [JsonProperty("postLanguage")]
      public LanguageResponse postLanguage { get; set; }
    
      [JsonProperty("postMediaFile")]
      public MediaResponse postMediaFile { get; set; }
    
      [JsonProperty("postMediaFiles")]
      public List<MediaResponse> postMediaFiles { get; set; }
    
      [JsonProperty("postTemplate")]
      public bool postTemplate { get; set; }
    
      [JsonProperty("putLanguage")]
      public LanguageResponse putLanguage { get; set; }
    
      [JsonProperty("register")]
      public UserResponse register { get; set; }
    
      [JsonProperty("resendConfirmation")]
      public bool resendConfirmation { get; set; }
    
      [JsonProperty("resetPassword")]
      public bool resetPassword { get; set; }
    
      [JsonProperty("setContactData")]
      public bool setContactData { get; set; }
    
      [JsonProperty("setKeyLocalStorage")]
      public bool setKeyLocalStorage { get; set; }
    
      [JsonProperty("setSetting")]
      public bool setSetting { get; set; }
    
      [JsonProperty("setTranslation")]
      public List<TranslationResponse> setTranslation { get; set; }
      #endregion
    }
    #endregion
    
    #region PostSettingInput
    public class PostSettingInput {
      #region members
      [Required]
      [JsonRequired]
      public string key { get; set; }
    
      [Required]
      [JsonRequired]
      public string type_settings { get; set; }
    
      [Required]
      [JsonRequired]
      public PostSettingValueInput value { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region PostSettingValueInput
    public class PostSettingValueInput {
      #region members
      [Required]
      [JsonRequired]
      public string type { get; set; }
    
      [Required]
      [JsonRequired]
      public string value { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region Query
    public class Query {
      #region members
      [JsonProperty("agvAllContents")]
      public AGVContentsResponse agvAllContents { get; set; }
    
      [JsonProperty("agvAllEvents")]
      public List<AGVEventResponse> agvAllEvents { get; set; }
    
      [JsonProperty("agvAllEventsByPage")]
      public AGVEventGetPageResponse agvAllEventsByPage { get; set; }
    
      [JsonProperty("agvAllInscriptions")]
      public List<AGVInscriptionResponse> agvAllInscriptions { get; set; }
    
      [JsonProperty("agvAllInscriptionsByPage")]
      public AGVInscriptionGetPageResponse agvAllInscriptionsByPage { get; set; }
    
      [JsonProperty("agvGetAllClassEvents")]
      public List<string> agvGetAllClassEvents { get; set; }
    
      [JsonProperty("agvGetContentHistory")]
      public HistoricResponse agvGetContentHistory { get; set; }
    
      [JsonProperty("agvGetEvent")]
      public AGVEventResponse agvGetEvent { get; set; }
    
      [JsonProperty("agvGetNewsletterInscriptionByEmail")]
      public AGVNewsletterGetInscriptionResponse agvGetNewsletterInscriptionByEmail { get; set; }
    
      [JsonProperty("agvGetNewsletterInscriptionsPage")]
      public AGVNewsletterInscriptionsPageResponse agvGetNewsletterInscriptionsPage { get; set; }
    
      [JsonProperty("agvGetNewsletterInscriptionsResendStatus")]
      public bool agvGetNewsletterInscriptionsResendStatus { get; set; }
    
      [JsonProperty("agvGetNewsletterMessageById")]
      public AGVNewsletterGetMessagesResponse agvGetNewsletterMessageById { get; set; }
    
      [JsonProperty("agvGetNewsletterMessagesPage")]
      public AGVNewsletterMessagesPageResponse agvGetNewsletterMessagesPage { get; set; }
    
      [JsonProperty("agvGetNextEvents")]
      public AGVEventGetNextsResponse agvGetNextEvents { get; set; }
    
      [JsonProperty("deleteMediaFiles")]
      public bool deleteMediaFiles { get; set; }
    
      [JsonProperty("exportTranslations")]
      public string exportTranslations { get; set; }
    
      [JsonProperty("getAllEventHistory")]
      public List<HistoricResponse> getAllEventHistory { get; set; }
    
      [JsonProperty("getAllLanguage")]
      public List<LanguageResponse> getAllLanguage { get; set; }
    
      [JsonProperty("getAllRoles")]
      public List<string> getAllRoles { get; set; }
    
      [JsonProperty("getAllSettings")]
      public List<SettingsResponse> getAllSettings { get; set; }
    
      [JsonProperty("getAllTranslations")]
      public List<TranslationResponse> getAllTranslations { get; set; }
    
      [JsonProperty("getAllTranslationsByKeys")]
      public List<TranslationResponse> getAllTranslationsByKeys { get; set; }
    
      [JsonProperty("getAllUserHistoric")]
      public List<HistoricResponse> getAllUserHistoric { get; set; }
    
      [JsonProperty("getAllUsers")]
      public List<UserResponse> getAllUsers { get; set; }
    
      [JsonProperty("getContactData")]
      public ContactMeResponse getContactData { get; set; }
    
      [JsonProperty("getEventHistory")]
      public HistoricResponse getEventHistory { get; set; }
    
      [JsonProperty("getHistoricFilters")]
      public HistoricFiltersResponse getHistoricFilters { get; set; }
    
      [JsonProperty("getHistoricPage")]
      public HistoricPageResponse getHistoricPage { get; set; }
    
      [JsonProperty("getLanguage")]
      public LanguageResponse getLanguage { get; set; }
    
      [JsonProperty("getLocalStorage")]
      public LocalStorageResponse getLocalStorage { get; set; }
    
      [JsonProperty("getMediaFile")]
      public MediaResponse getMediaFile { get; set; }
    
      [JsonProperty("getTemplateByType")]
      public TemplateResponse getTemplateByType { get; set; }
    
      [JsonProperty("getUser")]
      public UserResponse getUser { get; set; }
    
      [JsonProperty("getUserAllHistoricByUser")]
      public List<HistoricResponse> getUserAllHistoricByUser { get; set; }
    
      [JsonProperty("getUserHistoric")]
      public HistoricResponse getUserHistoric { get; set; }
    
      [JsonProperty("getVersion")]
      public string getVersion { get; set; }
    
      [JsonProperty("me")]
      public UserResponse me { get; set; }
    
      [JsonProperty("sendEmail")]
      public EmailResponse sendEmail { get; set; }
    
      [JsonProperty("sendEmailFromToAddressAndApp")]
      public EmailResponse sendEmailFromToAddressAndApp { get; set; }
    
      [JsonProperty("sendEmailFromToApp")]
      public EmailResponse sendEmailFromToApp { get; set; }
    
      [JsonProperty("sendEmailToApp")]
      public EmailResponse sendEmailToApp { get; set; }
    
      [JsonProperty("serverVersion")]
      public string serverVersion { get; set; }
    
      [JsonProperty("validUserName")]
      public bool validUserName { get; set; }
      #endregion
    }
    #endregion
    
    #region RegisterInput
    public class RegisterInput {
      #region members
      public string address { get; set; }
    
      public string cap { get; set; }
    
      public string certificate { get; set; }
    
      public string code { get; set; }
    
      [Required]
      [JsonRequired]
      public string email { get; set; }
    
      public bool? isEmailConfirmed { get; set; }
    
      [Required]
      [JsonRequired]
      public string lastName { get; set; }
    
      [Required]
      [JsonRequired]
      public string name { get; set; }
    
      [Required]
      [JsonRequired]
      public string password { get; set; }
    
      public string phone { get; set; }
    
      public List<string> roles { get; set; }
    
      [Required]
      [JsonRequired]
      public string userName { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region ResendConfirmationInput
    public class ResendConfirmationInput {
      #region members
      [Required]
      [JsonRequired]
      public string email { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region ResetPasswordInput
    public class ResetPasswordInput {
      #region members
      [Required]
      [JsonRequired]
      public string password { get; set; }
    
      [Required]
      [JsonRequired]
      public string token { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region SetTranslationInput
    public class SetTranslationInput {
      #region members
      public TranslationInput translation { get; set; }
    
      public List<TranslationInput> translations { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region SettingsResponse
    public class SettingsResponse {
      #region members
      [JsonProperty("key")]
      public string key { get; set; }
    
      [JsonProperty("type_settings")]
      public string type_settings { get; set; }
    
      [JsonProperty("value")]
      public SettingsValueResponse value { get; set; }
      #endregion
    }
    #endregion
    
    #region SettingsValueResponse
    public class SettingsValueResponse {
      #region members
      [JsonProperty("type")]
      public string type { get; set; }
    
      [JsonProperty("value")]
      public string value { get; set; }
      #endregion
    }
    #endregion
    
    #region TemplateInput
    public class TemplateInput {
      #region members
      [Required]
      [JsonRequired]
      public string body { get; set; }
    
      [Required]
      [JsonRequired]
      public string documentType { get; set; }
    
      public double? id { get; set; }
    
      [Required]
      [JsonRequired]
      public string title { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region TemplateResponse
    public class TemplateResponse {
      #region members
      [JsonProperty("body")]
      public string body { get; set; }
    
      [JsonProperty("documentType")]
      public string documentType { get; set; }
    
      [JsonProperty("id")]
      public double? id { get; set; }
    
      [JsonProperty("title")]
      public string title { get; set; }
      #endregion
    }
    #endregion
    
    #region TranslationInput
    public class TranslationInput {
      #region members
      [Required]
      [JsonRequired]
      public string key { get; set; }
    
      [Required]
      [JsonRequired]
      public double languageId { get; set; }
    
      [Required]
      [JsonRequired]
      public string value { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region TranslationResponse
    public class TranslationResponse {
      #region members
      [JsonProperty("id")]
      public string id { get; set; }
    
      [JsonProperty("key")]
      public string key { get; set; }
    
      [JsonProperty("languageId")]
      public double languageId { get; set; }
    
      [JsonProperty("value")]
      public string value { get; set; }
      #endregion
    }
    #endregion
    
    #region UserResponse
    public class UserResponse {
      #region members
      [JsonProperty("address")]
      public string address { get; set; }
    
      [JsonProperty("cap")]
      public string cap { get; set; }
    
      [JsonProperty("certificate")]
      public string certificate { get; set; }
    
      [JsonProperty("code")]
      public string code { get; set; }
    
      [JsonProperty("email")]
      public string email { get; set; }
    
      [JsonProperty("id")]
      public double id { get; set; }
    
      [JsonProperty("isEmailConfirmed")]
      public bool isEmailConfirmed { get; set; }
    
      [JsonProperty("lastName")]
      public string lastName { get; set; }
    
      [JsonProperty("name")]
      public string name { get; set; }
    
      [JsonProperty("phone")]
      public string phone { get; set; }
    
      [JsonProperty("roles")]
      public List<string> roles { get; set; }
    
      [JsonProperty("userName")]
      public string userName { get; set; }
      #endregion
    }
    #endregion
    
    #region ValidUserNameInput
    public class ValidUserNameInput {
      #region members
      public double? id { get; set; }
    
      [Required]
      [JsonRequired]
      public string userName { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(JsonRequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
  }
  
}
